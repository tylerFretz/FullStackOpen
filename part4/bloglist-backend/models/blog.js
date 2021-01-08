const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    author: { type: String },
    title: { type: String },
    url: { type: String, required: true, unique: true, match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/ },
    upvotes: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

// Apply the uniqueValidator plugin to blogSchema.
blogSchema.plugin(uniqueValidator)

// Override the toJSON method to remove the _id and __v fields
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)

