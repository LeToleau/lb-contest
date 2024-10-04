var express = require('express');
var router = express.Router();
var db = require('../models/dbConnection');
var fs = require('fs');
var path = require('path');

/* GET export XML */
router.get('/xml', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM lb_contest_winners';
    const participants = await db.query(query);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<winners>\n';
    participants.forEach(row => {
      xml += `  <winner>\n`;
      Object.keys(row).forEach(key => {
        xml += `    <${key}>${row[key]}</${key}>\n`;
      });
      xml += `  </winner>\n`;
    });
    xml += '</winners>';

    const filePath = path.join(__dirname, '../tmp', 'export-winners.xml');
    fs.writeFileSync(filePath, xml);

    res.download(filePath, 'export-winners.xml', (err) => {
      if (err) {
        throw err;
      }
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error('Error exporting XML:', err);
    res.status(500).send('Error exporting XML');
  }
});

/* GET export CSV */
router.get('/csv', async (req, res, next) => {
    try {
      const query = 'SELECT * FROM lb_contest_winners';
      const participants = await db.query(query);
  
      // Definir los encabezados del CSV
      const headers = ['id', 'name', 'lastname', 'phone', 'email', 'tax_code', 'city', 'postal_code', 'province', 'created_at', 'address', 'prize'];
      
      // Crear la primera línea del CSV con los encabezados
      let csv = headers.join(',') + '\n';
      
      // Añadir cada fila de datos al CSV
      participants.forEach(row => {
        let rowData = headers.map(header => {
          let value = row[header];
          // Envolver en comillas los campos que contienen comas o saltos de línea
          if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
            value = `"${value.replace(/"/g, '""')}"`; // Escapar comillas dobles
          }
          return value;
        });
        csv += rowData.join(',') + '\n';
      });
  
      const filePath = path.join(__dirname, '../tmp', 'export-winners.csv');
      fs.writeFileSync(filePath, csv);
  
      res.download(filePath, 'export-winners.csv', (err) => {
        if (err) {
          throw err;
        }
        fs.unlinkSync(filePath);
      });
    } catch (err) {
      console.error('Error exporting CSV:', err);
      res.status(500).send('Error exporting CSV');
    }
});

module.exports = router;