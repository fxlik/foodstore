const mongoose = require('mongoose')
const { model, Schema } = mongoose

const deliveryAddressSchema = Schema({
    nama: {
        type: String,
        required: [true, 'Nama alamat harus diisi'],
        maxLength: [255, 'Panjang maksimal nama alamat 255 karakter']
    },
    kelurahan: {
        type: String,
        required: [true, 'Kelurahan harus diisi'],
        maxLength: [255, 'Panjang maksimal kelurahan 255 karakter.']
    },
    kecamatan: {
        type: String,
        required: [true, 'Kecamatan harus diisi'],
        maxLength: [255, 'panjang maksimal kecamatan 255 karakter']
    },
    kabupaten: {
        type: String,
        required: [true, 'Kabupaten harus diisi.'],
        maxLength: [255, 'Panjang maksimal kabupaten 255 karakter']
    },
    provinsi: {
        type: String,
        required: [true, 'Provinsi harus diisi.'],
        maxLength: [255, 'Panjang maksimal provinsi 255 karakter']
    },
    detail: {
        type: String,
        required: [true, 'Detail alamat harus diisi.'],
        maxLength: [1000, 'Panjang maksimal detail alamat adalah 1000 karakter.']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = model('DeliveryAddress', deliveryAddressSchema)