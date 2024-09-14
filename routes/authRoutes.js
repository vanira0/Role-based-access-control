const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ADMIN, USER } = require('../utils/roles');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/protected/user');
    } catch (error) {
        res.status(401).render('error', { message: 'Invalid credentials' });
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password, role } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            throw new Error('Username already exists');
        }

        const newUser = new User({ username, password, role});
        await newUser.save();

        res.redirect('/auth/login');
    } catch (error) {
        res.status(400).render('error', { message: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});



module.exports = router;
