const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        secret: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        subscription: {
            type: Array,
            required: false,
        }
    }
)

module.exports = mongoose.model('ca-users', userSchema)

