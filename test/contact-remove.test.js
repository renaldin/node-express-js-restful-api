import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestContact, createTestUser, getTestContact, getTestUser, removeAllTestContacts, removeTestUser } from "./test-util.js"

describe('DELETE /api/contact/:contactId', () => {
    beforeEach(async () => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it ('Should can remove contact', async () => {
        let testContact = await getTestContact()
        const result = await supertest(web)
            .delete('/api/contact/' + testContact.id)
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data).toBe('Ok')
        testContact = await getTestContact()
        expect(testContact).toBeNull()
    })

    it ('Should can reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const result = await supertest(web)
            .delete('/api/contact/' + (testContact.id + 1))
            .set('Authorization', 'test')
        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})