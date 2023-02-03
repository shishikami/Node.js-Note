const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("GET request arrived");
    res.send("GET request");
})

router.post('/', (req, res) => {
    res.send("POST request");
})

module.exports = router;