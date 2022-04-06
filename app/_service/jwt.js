const key = "MY_KEY"
const jwt = require('jsonwebtoken');

const signToken = (user) => {
    return jwt.sign(user, key, {
        expiresIn: '9h'
    })
}

const verifyToken = (token) => {
    return jwt.verify(token, key)
}

module.exports = {
    signToken,
    verifyToken
}