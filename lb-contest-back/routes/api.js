var express = require('express');
var router = express.Router();
var pool = require('../models/dbConnection');

const prizeFrequency = {
    prize1: 1,  // 1 per day
    prize2: 5, // 10 per day
    prize3: 15  // 50 per day
};

let availablePrizes = [];
let currentDate = null;

const getTodaysDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const checkPrizeAvailability = async () => {
    const today = getTodaysDate();
    console.log(today);
    const query = `
        SELECT prize, COUNT(*) as count
        FROM lb_contest_winners
        WHERE DATE(created_at) = ?
        GROUP BY prize
    `;
    const results = await pool.query(query, [today]);
    let prizeCount = {
        prize1: 0,
        prize2: 0,
        prize3: 0
    };
    results.forEach(row => {
        prizeCount[row.prize] = row.count;
    });
    return prizeCount;
};

const initializeAvailablePrizes = async () => {
    const prizeCount = await checkPrizeAvailability();
    availablePrizes = [];

    if (prizeCount.prize1 < prizeFrequency.prize1) {
        for (let i = 0; i <  prizeFrequency.prize1; i++) {
            availablePrizes.push('prize1')
        }
    };
    if (prizeCount.prize2 < prizeFrequency.prize2) {
        for (let i = 0; i <  prizeFrequency.prize2; i++) {
            availablePrizes.push('prize2')
        }
    };
    if (prizeCount.prize3 < prizeFrequency.prize3) {
        for (let i = 0; i <  prizeFrequency.prize3; i++) {
            availablePrizes.push('prize3')
        }
    };

    const totalPrizesAssigned = prizeCount.prize1 + prizeCount.prize2 + prizeCount.prize3;
    const remainingSlots = Math.max(0, 21 - totalPrizesAssigned);

    for (let i = 0; i < remainingSlots; i++) {
        availablePrizes.push('no prize');
    }

    shuffleArray(availablePrizes);
    console.log(availablePrizes);
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
const getRandomPrize = async () => {
    const today = getTodaysDate();
    if (currentDate !== today || availablePrizes.length === 0) {
        currentDate = today;
        await initializeAvailablePrizes();
    }

    if (availablePrizes.length > 0) {
        return availablePrizes.shift(); // Obtener y eliminar el primer elemento de la lista
    } else {
        return 'no prize';
    }
};

router.get('/winners/:timestamp', async (req, res) => {
    console.log(req.params);
    const { timestamp } = req.params;
    console.log('HOLIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIS', timestamp)
    const query = `
        SELECT prize FROM lb_contest_winners WHERE created_at = ?
    `;

    try {
        const results = await pool.query(query, [timestamp]);
        console.log(results);
        if (results.length > 0) {
            res.status(200).json({ prize: results[0].prize });
        } else {
            res.status(404).json({ message: 'No winner found for the given timestamp' });
        }
    } catch (err) {
        console.error('Error retrieving winner:', err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/participants', async (req, res) => {
    const { name, lastname, phone, mail, taxCode, city, postCode, province, address, termsConditions, timestamp } = req.body;
    const query = `
        INSERT INTO lb_contest_participants (name, lastname, phone, mail, tax_code, city, postal_code, province, address, prize)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const queryCheck = `
    SELECT COUNT(*) as count FROM lb_contest_participants WHERE tax_code = ?
    `;

    // console.log(timestamp);

    try {
        // Verificar si el código fiscal ya está registrado
        const [checkResult] = await pool.query(queryCheck, [taxCode]);
        const isRegistered = checkResult.count > 0;
        let message = '';

        // console.log(isRegistered);

        if (!isRegistered) {
            const prize = await getRandomPrize();
            const result = await pool.query(query, [name, lastname, phone, mail, taxCode, city, postCode, province, address, prize]);
            const participantId = result.insertId;
    
            if (prize !== 'no prize') {
                await pool.query('INSERT INTO lb_contest_winners (participant_id, prize) VALUES (?, ?)', [participantId, prize]);
            }

            message = 'Participant Registered Successfully';
            res.status(201).json({ message: message, registered: isRegistered, prize: prize });
        } else {
            message = 'Participant Already Registered';
            res.status(201).json({ message: message, registered: isRegistered });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;