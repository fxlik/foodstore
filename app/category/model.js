const mongoose = require('mongoose')
const { model, Schema } = mongoose

let categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'panjang nama kategori minimal 3 karakter'],
        maxLength: [20, 'Panjang nama karakter tidak lebih dari 20 karakter'],
        required: [true, 'Nama kategori harus diisi']
    }
})

module.exports = model('Category', categorySchema)