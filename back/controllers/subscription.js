const userDb = require('../schemas/userSchema')

module.exports = {
    newSubscription: async (req, res) => {
        const { username, dateStart, dateEnd } = req.body
        const newSubscription =   {
          start: dateStart,
          end: dateEnd,
        }
      const user =  await userDb.findOneAndUpdate(
          {firstname: username},
           {subscription: newSubscription},
          {new: true}
        )
        res.send({success: true, message: "", subscription: user.subscription})
    }
}

