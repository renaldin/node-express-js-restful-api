import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestUser, removeTestUser } from "./test-util.js"

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'rahasia'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe('test')
    })

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: '',
                password: ''
            })
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    if('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: ''
            })
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: 'dsafda',
                password: 'rahasia'
            })
        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    afterEach(async () => {
        await removeTestUser()
    })
})