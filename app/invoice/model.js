const mongoose = require('mongoose')
const { model, Schema } = mongoose

const invoiceSchema = Schema({
    sub_total: {
        type: Number,
        required: [true, 'sub_total must be filled']
    },

    delivery_fee: {
        type: Number,
        required: [true, 'delivery_fee harus diisi']
    },

    delivery_address: {
        provinsi: { type: String, required: [true, 'Provinsi harus diisi'] },
        kabupaten: { type: String, required: [true, 'kabupaten harus diisi'] },
        kecamatan: { type: String, required: [true, 'kecamatan harus diisi'] },
        keluarahan: { type: String, required: [true, 'kelurahan harus diisi'] }
    },

    total: {
        type: Number,
        required: [true, 'Total harus diisi']
    },

    payment_status: {
        type: String,
        enum: ['waiting_payment', 'paid'],
        default: 'waiting_payment'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {timestamps: true})

module.exports = model('Invoice', invoiceSchema)