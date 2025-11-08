const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');

router.get('/mailKey', requireAuth, (req, res) => {
    res.send(process.env.EMAILJS_PRIVATE_KEY);
});

router.get('/', (req, res) => {
    res.send('Hello from the API backend!');
}
);


module.exports = router;