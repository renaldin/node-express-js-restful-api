import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/responseError.js"
import { createValidation, getValidation, searchValidation, updateValidation } from "../validation/contactValidation.js"
import { validate } from "../validation/validation.js"

const create = async (user, request) => {
    const contact = validate(createValidation, request)
    contact.username = user.username
    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const get = async (user, contactId) => {
    const id = validate(getValidation, contactId)
    const contact = await prismaClient.contact.findFirst({
        where: {
            username: user.username,
            id: id
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
    if (!contact) {
        throw new ResponseError(404, 'Contact is not found')
    }
    return contact
}

const update = async (user, request) => {
    const contact = validate(updateValidation, request)
    const totalContact = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contact.id
        }
    })
    console.log(totalContact)
    if (totalContact === 0) {
        throw new ResponseError(404, 'Contact is not found')
    }
    return prismaClient.contact.update({
        where: {
            id: contact.id
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const remove = async (user, contactId) => {
    contactId = validate(getValidation, contactId)
    const totalInDatabase = await prismaClient.contact.count({
        where: {
            username: user.username,
            id: contactId
        }
    })
    if (totalInDatabase === 0) {
        throw new ResponseError(404, 'Data Not Found')
    }
    return prismaClient.contact.delete({
        where: {
            username: user.username,
            id: contactId
        }
    })
}

const search = async (user, request) => {
    request = validate(searchValidation, request)
    const skip = (request.page - 1) * request.size
    const filters = []
    filters.push({
        username: user.username
    })
    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }
    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    })
    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    })
    return {
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size) // Math.cell = pembulatan ke bawah
        },
        data: contacts
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}