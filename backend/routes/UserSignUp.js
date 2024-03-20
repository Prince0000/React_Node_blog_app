const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../model/Signup');

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await Signup.create({ name: req.body.name, email: req.body.email, password: hashedPassword });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Registration failed. Please try again later." });
    }
});

module.exports = router;
