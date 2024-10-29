const jwt = require('jsonwebtoken');

const apiauth = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({ msg: "Invalid Authentication" });

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({ msg: "Invalid Authentication" });

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

module.exports = apiauth;