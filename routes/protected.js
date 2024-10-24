const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, (req, res) => {
    res.json({ mgs: 'You are authorized to acces this route', user: req.user });
});

module.exports = router;