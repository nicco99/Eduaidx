const jwt = require('jsonwebtoken')
const {db} = require("../db/dbConnection")
const { read } = require('../controllers/auth')
require("dotenv").config()
const requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt

if(token){
jwt.verify(token,process.env.SECRET,(error,decodedToken)=>{
if(error){
    console.log(error.message)
    res.redirect("/login")
}
else
{
const dec = jwt.decode(token)

console.log("token",decodedToken)
console.log("dec",dec)
next()
}
})
}else{
    res.redirect("/login")
}


}

const clearTokenCookie = (res) => {
    // Clear the JWT token cookie by setting an expired cookie
    res.cookie('jwt', '', { expires: new Date(0) });
};

const getCurrentUser = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.SECRET,async(error,decodedToken)=>{
        if(error){
            res.locals.user = null
            next()
        }else{
        const user = await read(decodedToken.id)
        res.locals.user = user
        next()
        }
        })
        }
        else{
            res.locals.user = null
            next()
        }

}


const getPromoCode = (req,res,next)=>{
const {promo_code} = req.query
if(promo_code == undefined){
    res.locals.referral = null
     next()
}else{
    
    res.locals.referral = promo_code
    next()
}   
}

module.exports = { requireAuth, clearTokenCookie,getCurrentUser,getPromoCode };
