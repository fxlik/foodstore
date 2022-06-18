const { policyFor } = require('../policy')
const Tag = require('./model')

async function index(req, res, next) {
    try {
        let tags = await Tag.find()
        return res.json(tags)
    } catch (err) {
        next(err)
    }
}

async function store(req, res, next) {
    let policy = policyFor(req.user)
    if (!policy.can('create', 'Tag')) {
        return res.json({
            error: 1,
            message: 'Anda tidak memiliki akses untuk membuat tag'
        })
    }

    try {
        let payload = req.body
        let tag = new Tag(payload)
        await tag.save()
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        } else {
            
        }
        next(err)
    }
}

async function update(req, res, next) {
    let policy = policyFor(req.user)
    if (!policy.can('update', 'Tag')) {
        return res.json({
            error: 1,
            message: 'Anda tidak memiliki akses untuk mengupdate Tag'
        })
    }

    try {
        let payload = req.body
        let tag = await Tag.findOneAndUpdate({_id: req.params.id}, payload, {new: true, runValidators: true})
        return res.json(tag)
    } catch (err) {
        if (err && err.name === 'ValitadionError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

async function destroy(req, res, next) {
    let policy = policyFor(req.user)
    if (!policy.can('delete', 'Tag')) {
        return res.json({
            error: 1,
            message: 'Anda tidak memiliki akses untuk menghapus Tag'
        })
    }

    try {
        let tag = await Tag.findOneAndDelete({_id: req.params.id})
        return res.json(tag)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}