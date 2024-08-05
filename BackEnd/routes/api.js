const express = require('express');
const router = express.Router();

router.get('/mailKey', (req, res) => {

    res.send(process.env.EMAILJS_PRIVATE_KEY);

});


module.exports = router;