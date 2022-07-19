const mongoose = require('mongoose')
const { model, Schema } = mongoose

const orderItemSchema = Schema({
    name: {
        type: String,
        minLength: [5, 'karakter minimal 5']
    },

    price: {
        type: Number,
        required: [true, 'Harga item harus diisi']
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
})

module.exports = model('OrderItem', orderItemSchema)