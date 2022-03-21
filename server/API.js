// server/API.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//dette kan kjøres ved å skrive dette i din valgte nettleser: http://localhost:3001/api
