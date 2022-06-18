const DeliveryAddress = require('./model')
const { policyFor } = require('../policy')
const { subject } = require('@casl/ability')

async function store(req, res, next) {
    let policy = policyFor(req.user)
    
    if (!policy.can('create', 'DeliveryAddress')) {
        return res.json({
            error: 1,
            message: 'Anda tidak memiliki akses untuk melakukan aksi ini.'
        })
    }
    try {
        let payload = req.body
        let user = req.user
        let address = new DeliveryAddress({ ...payload, user: user._id })
        await address.save()
        return res.json(address)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

async function update(req, res, next) {
    let policy = policyFor(req.user)
    
    try {
        let { id } = req.params
        let { _id, ...payload } = req.body
        let address = await DeliveryAddress.findOne({_id: id})
        let subjectAddress = subject('DeliveryAddress', { ...address, user_id: address.user})
        if (!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk merubah data ini'
            })
        }
        address = await DeliveryAddress.findOneAndUpdate({_id: id}, payload, {new: true})
        return res.json(address)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = {
    store, update
}