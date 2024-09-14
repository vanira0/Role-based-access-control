const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { ADMIN, USER, GUEST } = require('../utils/roles');
const { checkRole } = require('../middleware/authMiddleware');

router.get('/users', checkRole(ADMIN), async (req, res) => {
    const users = await User.find().select('_id username role createdAt updatedAt');
    res.render('admin/users', { users, ADMIN, USER, GUEST });
});

router.put('/users/:userId/update-role', checkRole(ADMIN), async (req, res) => {
    console.log('Updating role:', req.params.userId);
    console.log(req.body);

    const { userId } = req.params;
    const { newRole } = req.body;

    if (!['admin', 'user', 'guest'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role' });
    }


    try {
        const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Role updated successfully');
        console.log(user)
        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update role' });
    }
});

router.put('/update-admin-role', checkRole(ADMIN), async (req, res) => {
    const { newRole } = req.body;

    if (!(newRole in Object.values(ADMIN))) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    try {
        const admin = await User.findByIdAndUpdate(req.user.userId, { role: newRole }, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin role updated successfully', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update admin role' });
    }
});

module.exports = router;
