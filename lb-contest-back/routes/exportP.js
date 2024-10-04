var express = require('express');
var router = express.Router();
var db = require('../models/dbConnection');
var fs = require('fs');
var path = require('path');

/* GET export XML */
router.get('/xml', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM lb_contest_participants';
    const participants = await db.query(query);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<participants>\n';
    participants.forEach(row => {
      xml += `  <participant>\n`;
      Object.keys(row).forEach(key => {
        xml += `    <${key}>${row[key]}</${key}>\n`;
      });
      xml += `  </participant>\n`;
    });
    xml += '</participants>';

    const filePath = path.join(__dirname, '../tmp', 'export-participants.xml');
    fs.writeFileSync(filePath, xml);

    res.download(filePath, 'export-participants.xml', (err) => {
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
      const query = 'SELECT * FROM lb_contest_participants';
      const participants = await db.query(query);
  
      // Definir los encabezados del CSV
      const headers = ['id', 'name', 'lastname', 'phone', 'mail', 'tax_code', 'city', 'postal_code', 'province', 'address', 'prize'];
      
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
  
      const filePath = path.join(__dirname, '../tmp', 'export-participants.csv');
      fs.writeFileSync(filePath, csv);
  
      res.download(filePath, 'export-participants.csv', (err) => {
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