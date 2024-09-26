import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestUser, removeAllTestContacts, removeTestUser } from "./test-util.js"

describe('POST /api/contact', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it ('Should can create contact', async () => {
        const result = await supertest(web)
            .post('/api/contact')
            .set('Authorization', 'test')
            .send({
                first_name: 'test',
                last_name: 'test',
                email: 'test@gmail.com',
                phone: '089000'
            })
        expect(result.status).toBe(201)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe('test')
        expect(result.body.data.last_name).toBe('test')
        expect(result.body.data.email).toBe('test@gmail.com')
        expect(result.body.data.phone).toBe('089000')
    })

    it ('should can reject create contact if validation error', async () => {
        const result = await supertest(web)
            .post('/api/contact')
            .set('Authorization', 'test')
            .send({
                first_name: '',
                last_name: 'test',
                email: 'test',
                phone: ''
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})