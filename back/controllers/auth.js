const bcrypt = require("bcrypt")
const uid = require("uid")
const userSchema = require('../schemas/userSchema')

module.exports = {
    register: async (req, res) => {
        const { firstname, lastname, email, password, subscription} = req.body
        const hashedPass = await bcrypt.hash(password, 10)
        const userInDb = new userSchema({
            secret: uid.uid(),
            firstname,
            lastname,
            email,
            password: hashedPass,
            subscription,
        })
        const existUser = await userSchema.findOne({email})
        if(existUser) return res.send({success: false, message: "User with email already exist"})
        await userInDb.save()
        const allUsers = await userSchema.find({firstname: {$ne: 'admin'}})

        res.send({success: true, message: "", allUsers})
    },
    login: async (req, res) => {
        const {email, password} = req.body
        const userExists = await userSchema.findOne({email})
        const allUsers = await userSchema.find({firstname: {$ne: 'admin'}})
        if(!userExists) return res.send({success: false, message: "Bad credentials"})
        const passMatch = await bcrypt.compare(password, userExists.password)

        if(!passMatch) return res.send({success: false, message: "Bad credentials"})

        return res.send({
            success: true,
            message: "",
            secret: userExists.secret,
            firstname: userExists.firstname,
            allUsers,
            user: userExists,
            subscription: userExists.subscription
        })
        
    }
}