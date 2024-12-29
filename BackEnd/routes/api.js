const express = require('express');
const router = express.Router();

router.get('/mailKey', (req, res) => {

    res.send(process.env.EMAILJS_PRIVATE_KEY);

});

router.get('/', (req, res) => {
    res.send('Hello from the API backend!');
}
);


module.exports = router;