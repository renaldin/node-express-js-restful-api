import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js"

describe ('GET /api/contact/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it ('should can get contact', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .get('/api/contact/'+testContact.id)
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.email).toBe(testContact.email)
        expect(result.body.data.phone).toBe(testContact.phone)
    })

    it ('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .get('/api/contact/'+(testContact.id + 1))
            .set('Authorization', 'test')
        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})