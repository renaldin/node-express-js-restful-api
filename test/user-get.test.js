import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestUser, removeTestUser } from "./test-util.js"

describe('GET /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it ('should can get user current', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    })

    it ('should reject get if token is wrong', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah')
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})