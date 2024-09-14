const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/authMiddleware');
const { ADMIN, USER } = require('../utils/roles');

router.get('/user', checkRole(USER,ADMIN), (req, res) => {
    res.render('protected', { role: req.user.role });
});

router.get('/admin', checkRole(ADMIN), (req, res) => {
    res.render('admin', { role: req.user.role });
});

module.exports = router;
