// server/index.js

const path = require('path');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
var cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, '../webapp/build')));
app.use(express.json());


//Searches through a local csv file and outputs whether or not a person is politically exposed or not
app.get('/api/pep', (req, res) => {
    const name = req.query.name;
    var numberOfHits = 0;
    var results = [];
    var details = [];

    fs.createReadStream(path.resolve(__dirname, 'pep.csv'))
    .pipe(csv())
    .on('data', (row) => {
      if(typeof row.name != 'undefined' && row.name.toLowerCase() == name.toLowerCase()){
        numberOfHits++;
        results.push(row.name);
        details.push(row);
        console.log(row.name);
      } 
    }).on('end', () => {
      res.status(200).send({
        "numberOfHits": numberOfHits,
        "results": results,
        "details" : details
      });
    });
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../webapp/build', 'index.html'));
});

app.listen(
  PORT,
  () => console.log(`server is alive on http://localhost:${PORT}`)
)

//dette kan kjøres ved å skrive dette i din valgte nettleser: http://localhost:3001/api eller på https://stacc-kodeoppgave-22-sb.herokuapp.com/
