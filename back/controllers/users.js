const userDb = require('../schemas/userSchema')

module.exports = {
    deleteUser: async (req, res) => {
        const { firstname } = req.params
        await userDb.findOneAndDelete({firstname})
        const allUsers = await userDb.find({firstname: {$ne: 'admin'}})
        res.send({success: true, message: "", allUsers})
    },
    updateUser: async (req, res) => {
        const {firstname, lastname, email, start, end, id } = req.body
        await userDb.findOneAndUpdate(
            {_id: id},
            {firstname, lastname, email, $set: {"subscription.0.start": start, "subscription.0.end": end} },
            { new: true }
        )
        const allUsers = await userDb.find({firstname: {$ne: 'admin'}})
        res.send({success: true, message: "", allUsers})
    }
}

