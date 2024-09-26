import contactService from "../service/contactService.js"

const create = async (req, res, next) => {
    try {
        const user = req.user
        const request = req.body
        const result = await contactService.create(user, request)
        res.status(201).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        const result = await contactService.get(user, contactId)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user
        const contact = req.body
        contact.id = req.params.contactId
        const result = await contactService.update(user, contact)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user
        const contactId = req.params.contactId
        await contactService.remove(user, contactId)
        res.json({
            data: 'Ok'
        })
    } catch (err) {
        next(err)
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }
        const result = await contactService.search(user, request)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
