import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { removeTestUser } from "./test-util.js"

describe('POST /api/users', () => {
    afterEach(async () => {
        await removeTestUser()
    })
    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()
    })
    it('should reject if request invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: ''
            })
        logger.error(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
    it('should reject if username already exist', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            })
        logger.info(result.body)
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
        expect(result.body.data.password).toBeUndefined()
        
        result = await supertest(web)
            .post('/api/users')
            .send({
                username: 'test',
                password: 'test',
                name: 'test'
            })
        logger.error(result.body)
        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})
