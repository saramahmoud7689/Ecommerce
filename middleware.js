const jwt = require('jsonwebtoken')
const utli = require('util')
const asyncverify = utli.promisify(jwt.verify)
const secretkey = 'kkkk'
const customError = require('./helpers/customError')

const userauthorized = async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, secretkey)
    
    if (decoded.isAdmin) 
        next(customError({
            message: "Not Authorized",
            statusCode: 401
        }))
    
    next()
}

const adminauthorized =  async (req, res, next) => {
    const { authorization: token } = req.headers
    const decoded = await asyncverify(token, secretkey)
    console.log(req.params.id)
    if (!decoded.isAdmin) 
        next(customError({
            message: "Not Authorized",
            statusCode: 401
        }))
    
    next()
}

module.exports ={ userauthorized , adminauthorized }