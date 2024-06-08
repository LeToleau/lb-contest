const express = require('express');
const router = express.Router();
const pool = require('../models/dbConnection');
const nodemailer = require('nodemailer');

//const date = "2024-07-01";

const MAX_DAYS = 21;

let currentDate = null;
var availablePrizes = []

const transporter = nodemailer.createTransport({
    host: 'mail.lbcontest.it',
    port: 465,
    secure: true,
    auth: {
        user: 'no-reply@lbcontest.it',
        pass: '!nlyMBu&f39Z'
    },
});

const getWeekOfYear = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    // console.log(today, firstDayOfYear, pastDaysOfYear, Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7))
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
};

const getPrizes = async () => {
    try {
        const week = getWeekOfYear();
        const rows = await pool.query('SELECT prize FROM lb_contest_available_prizes WHERE week = ?', [week]);
        const prizesFromDB = [];
        rows.forEach(row => {
            prizesFromDB.push(row.prize);
        });
        console.log('rows', rows, 'prizes from db', prizesFromDB);
        if (rows.length > 0) {
            return prizesFromDB;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error, error.message)
    }
}



const prizeFrequency = {
    /*
    prize1: 1,
    prize2: 20,
    prize3: 100
    */
    prize1: 5,
    prize2: 5,
    prize3: 5
};

const saveInitializationDate = async () => {
    const currentWeek = getWeekOfYear();
    const today = new Date().toISOString().split('T')[0];

    try {
        // Elimina cualquier registro previo de la misma semana
        await pool.query('DELETE FROM lb_contest_initialization WHERE week = ?', [currentWeek]);
        // Inserta la nueva fecha de inicialización
        await pool.query('INSERT INTO lb_contest_initialization (week, initialization_date) VALUES (?, ?)', [currentWeek, today]);
    } catch (error) {
        console.error('Error saving initialization date:', error);
    }
};

const initializeAvailablePrizes = async () => {
    const currentWeek = getWeekOfYear();
    // Verifica si la semana actual ya ha sido inicializada
    try {        
        const [rows] = await pool.query('SELECT initialization_date FROM lb_contest_initialization WHERE week = ?', [currentWeek]);
        const initializationRows = rows ? JSON.parse(JSON.stringify(rows)) : [];

        if (initializationRows.initialization_date) {
            console.log(`Week ${currentWeek} already initialized on ${initializationRows.initialization_date}`);
            availablePrizes = await getPrizes();
            return; // No inicializa nuevamente si ya ha sido inicializada esta semana
        }
    
        // Verifica si han pasado más de MAX_DAYS dias desde la primera inicialización
        const [rows2] = await pool.query('SELECT MIN(initialization_date) as first_initialization_date FROM lb_contest_initialization');
        const firstInitializationRows = rows2 ? JSON.parse(JSON.stringify(rows2)) : [];

        if (firstInitializationRows.first_initialization_date) {
            const firstInitializationDate = new Date(firstInitializationRows.first_initialization_date);
            const today = new Date();
            const diffDays = Math.floor((today - firstInitializationDate) / (24 * 60 * 60 * 1000));
            // console.log('diffDays:', diffDays);
            if (diffDays >= (MAX_DAYS - 1)) {
                console.log(`More than ${MAX_DAYS - 1} days since first initialization`);
                return; // No inicializa si han pasado más de MAX_DAYS dias
            }
        }
    } catch (error) {
        console.log(error, error.message);
    }
    
    const prizeCount = { prize1: 0, prize2: 0, prize3: 0 };

    // console.log(availablePrizes);
    for (let prize in prizeFrequency) {
        const remaining = Math.max(0, prizeFrequency[prize]);
        for (let i = 0; i < remaining; i++) {
            availablePrizes.push(prize);
        }
    }

    const remainingSlots = Math.max(0, 15 - Object.values(prizeCount).reduce((acc, cur) => acc + cur, 0));
    for (let i = 0; i < remainingSlots; i++) {
        availablePrizes.push('no prize');
    }

    shuffleArray(availablePrizes);
    // console.log(availablePrizes);
    await saveAvailablePrizesToDB();
    await saveInitializationDate();
};

const saveAvailablePrizesToDB = async () => {
    const currentWeek = getWeekOfYear();
    
    try {
        const [rows] = await pool.query('SELECT initialization_date FROM lb_contest_initialization WHERE week < ?', [currentWeek]);
        const initializationRows = rows ? JSON.parse(JSON.stringify(rows)) : [];
        if (initializationRows.initialization_date) {
            await pool.query('DELETE FROM lb_contest_available_prizes WHERE week < ?', [currentWeek]);
            console.log(`deleted old weeks prizes`);
        }
        console.log('se borraron')
    } catch (error) {
        console.log(error, error.message);
    }

    // console.log(availablePrizes);
    for (let prize of availablePrizes) {
        await pool.query('INSERT INTO lb_contest_available_prizes (prize, week) VALUES (?, ?)', [prize, currentWeek]);
    }
    console.log('se agregaron')
};

const getRandomPrize = async () => {
    /*const today = new Date(date).toISOString().split('T')[0];
    if (currentDate !== today || availablePrizes.length === 0) {*/
        //currentDate = today;
        await initializeAvailablePrizes();
    //}

    try {
        console.log(availablePrizes);
        //console.log(availablePrizes);
        if (availablePrizes.length > 0) {
            // console.log(availablePrizes);
            const prize = availablePrizes.shift();
            await pool.query('DELETE FROM lb_contest_available_prizes WHERE prize = ? LIMIT 1', [prize]);
            return prize;
        } else {
            return 'no prize';
        }
    } catch (error) {
        console.log(error);
        return 'no prize';
    }
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const sendPrizeEmail = async (email, prize, code) => {
    const mailOptions = {
        from: 'no-reply@lbcontest.it',
        to: email,
        subject: '¡Felicitaciones! Has ganado un premio',
        html: `
        <div id="mail" style="background-color: #fff5ef;color: #303133;width: 600px;margin: 0 auto;font-family: Arial, Helvetica, sans-serif;">
            <div id="mail-heading">
                <div id="mail-logo-wrapper" style="display: flex;background-color: white;padding: 45px;">
                    <img src="https://lbcontest.it/admin-access/images//mail-logo.png" style="margin: auto" />
                </div>
                <img src="https://lbcontest.it/admin-access/images/${image}.png" style="width: 100%;" />
            </div>
            <div id="mail-body" style="background-color: #FFF5EF;padding: 64px 30px 71px;text-align: center;">
            <div id="mail-body-title" style="display: flex;margin: 0 auto 40px;filter: drop-shadow(2px 4px 6px black);max-width: max-content">
                <h1 style="font-size: 26px;line-height: 0;color: #000000">CONGRATULAZIONI!</h1>
                <img src="https://lbcontest.it/admin-access/images/cheers-icon.png" />
            </div>
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">HAI VINTO ${prize}</p><br /><br />
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">È con piacere che ti confermiamo che sei stato il fortunato vincitore del contest Indovina le note e vinci.</p><br /><br />
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">Verrai presto contattato dal team Laura Biagiotti Parfums ti invierà presto le indicazioni per ricevere il tuo premio.</p><br /><br />
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">Nel frattempo ti inviamo il codice di riferimento del premio, che servirà per verificare l’assegnazione. Ti consigliamo di custodirlo!</p>
            <div id="mail-code" style="padding: 15px 40px;background-color: white;margin: 40px auto;width: max-content;border: 1px solid #000000;">
                <p style="margin: 0;font-weight: 600;">Cocide del premio:</p> 
                <span style="font-size: 16px;line-height: 24px;">${code}</span>
            </div>
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">Ti ringraziamo per aver partecipato al concorso e ci auguriamo che ti sia piaciuta la nuova collezione AQVE ROMANE.</p><br /><br />
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">Resta in contatto con noi tramite i profili Facebbok e Instagram Laura Biagiotti Parfums e facci sapere quale è la tua fraganza preferita. </p><br /><br />
            <p style="color: #444444;font-size: 14px;line-height: 18px;font-weight: 500;margin: 0;">Grazie e a presto! 
                Il tuo team 
                LAURA BIAGIOTTI PARFUMS
            </p>
            </div>
            <div id="mail-footer">
                <div id="mail-footer-logo" style="display: flex;background-color: #ffffff;padding: 45px;border-top: 1px solid #444444;border-bottom: 1px solid #444444;">
                    <img src="https://lbcontest.it/admin-access/images//mail-logo.png" style="margin:auto" />
                </div>
                <div id="mail-footer-bottom" style="display: block;padding: 50px 30px 14px;">
                    <div id="mail-rrss" style="display: flex;margin: auto;width: max-content;margin-bottom: 42px">
                        <p style="font-size: 16px;font-weight: bold;text-transform: uppercase;color: #000000;line-height: 2;">Follow Us:</p>
                        <ul style="display: flex;list-style-type: none;padding-left: 24px;">
                        <li><a href="https://www.facebook.com/laurabiagiottiparfums"><img src="https://lbcontest.it/admin-access/images//fb.png" /></a></li>
                        <li style="margin-left: 24px"><a href="https://www.instagram.com/laurabiagiottiparfums/?hl=it"><img src="https://lbcontest.it/admin-access/images//ig.png" /></a></li>
                        <li style="margin-left: 24px"><a href="https://www.instagram.com/laurabiagiottiparfums/?hl=it"><img src="https://lbcontest.it/admin-access/images//yt.png" /></a></li>
                        </ul>
                    </div>
                    <div id="mail-footer-menu" style="max-width: max-content;margin: auto;">
                        <p style="font-size: 14px;line-height: 22px;color: #444444;text-align: center;">2024 &copy;Laura Biagiotti Parfums.</p>
                        <p style="font-size: 14px;line-height: 22px;color: #444444;text-align: center;"><a href="https://www.laurabiagiottiparfums.com/termini-duso/" style="font-size: 12px;line-height: 22px;color: #444444;">Termini d&lsquo;uso</a> | <a href="https://www.laurabiagiottiparfums.com/privacy-policy/" style="font-size: 12px;line-height: 22px;color: #444444;">Politica sulla privacy</a> | <a href="mailto:info@laurabiagiottiparfums.com" style="font-size: 12px;line-height: 22px;color: #444444;">Contatti</a></p>
                    </div>
                </div>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Función para generar un código de premio
const generatePrizeCode = (prize) => {
    // Genera un código único basado en el premio
    return prize + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

router.post('/participants', async (req, res) => {
    const { name, lastname, phone, mail, taxCode, city, postCode, province, address, termsConditions, uniqueId } = req.body;
    const queryCheck = 'SELECT COUNT(*) as count FROM lb_contest_participants WHERE tax_code = ?';

    try {
        const [checkResult] = await pool.query(queryCheck, [taxCode]);
        const isRegistered = checkResult.count > 0;
        let message = '';

        if (!isRegistered) {
            const prize = await getRandomPrize();
            const query = `
                INSERT INTO lb_contest_participants (name, lastname, phone, mail, tax_code, city, postal_code, province, address, prize, unique_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const result = await pool.query(query, [name, lastname, phone, mail, taxCode, city, postCode, province, address, prize, uniqueId]);
            const participantId = result.insertId;

            if (prize !== 'no prize') {
                const code = generatePrizeCode(prize); // Función para generar un código de premio
                await pool.query(
                    'INSERT INTO lb_contest_winners (participant_id, name, lastname, phone, email, tax_code, city, postal_code, province, address, prize, unique_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [participantId, name, lastname, phone, mail, taxCode, city, postCode, province, address, prize, uniqueId]
                );
                await sendPrizeEmail(mail, prize, code); // Enviar correo electrónico
            }

            message = 'Participant Registered Successfully';
            res.status(201).json({ message: message, registered: isRegistered, prize: prize });
        } else {
            message = 'Participant Already Registered';
            res.status(201).json({ message: message, registered: isRegistered });
        }
    } catch (err) {
        console.error('Error registering participant:', err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/winners/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;
    const query = 'SELECT prize FROM lb_contest_winners WHERE unique_id = ?';

    try {
        const [rows] = await pool.query(query, [uniqueId]);
        const results = rows ? JSON.parse(JSON.stringify(rows)) : [];
        if (results.prize) {
            res.status(200).json({ prize: results.prize });
        } else {
            res.status(404).json({ message: 'No winner found for the given unique ID' });
        }
    } catch (err) {
        console.error('Error retrieving winner:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;