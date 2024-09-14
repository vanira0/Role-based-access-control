const jwt = require('jsonwebtoken');
const { ADMIN, USER, GUEST } = require('../utils/roles');

function checkRole(...allowedRoles) {
    return (req, res, next) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).render('error', { message: 'Unauthorized: No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            //console.log(allowedRoles)
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).render('error', { message: 'Forbidden: Insufficient permissions' });
            }

            console.log(`Request to ${req.path} by user ${decoded.userId} (${decoded.role}) - Access granted`);
            next();
        } catch (error) {
            return res.status(401).render('error', { message: 'Unauthorized: Invalid token' });
        }
    };
}

module.exports = { checkRole };
