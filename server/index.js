// server/index.js

const path = require('path');
const express = require("express");
const fs = require('fs'); 
//const csv = require('csv-parse');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../webapp/build')));
app.use(express.json());


app.get("/api", (req, res) => {
    res.json({ message: "Ta en pep sjekk da vell!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../webapp/build', 'index.html'));
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//dette kan kjøres ved å skrive dette i din valgte nettleser: http://localhost:3001/api eller på 
