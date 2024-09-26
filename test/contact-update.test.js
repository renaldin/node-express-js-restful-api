import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js"

describe('PUT /api/contact/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it ('should can update existing contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put('/api/contact/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: 'Rey',
                last_name: 'Rey',
                email: 'rey@gmail.com',
                phone: '0899999'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe('Rey')
        expect(result.body.data.last_name).toBe('Rey')
        expect(result.body.data.email).toBe('rey@gmail.com')
        expect(result.body.data.phone).toBe('0899999')
    })

    it ('should reject if request is invalid', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put('/api/contact/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'Rey',
                email: 'rey',
                phone: '0899999'
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it ('should reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .put('/api/contact/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: 'Rey',
                last_name: 'Rey',
                email: 'rey@gmail.com',
                phone: '0899999'
            })
        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})