const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../model/Signup'); 

router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Signup.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        next(err); 
    }
});

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(500).json({ error: "An error occurred. Please try again later." });
});

module.exports = router;
