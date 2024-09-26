import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js"
import bcrypt from 'bcrypt'

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it ('Should can update users current', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'test update',
                password: 'rahasiaupdate'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test update')

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasiaupdate', user.password)).toBe(true)
    })

    it ('Should can update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 'test update'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test update')
    })

    it ('Should can update users password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: 'rahasiaupdate'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')

        const user = await getTestUser()
        expect(await bcrypt.compare('rahasiaupdate', user.password)).toBe(true)
    })

    it ('Should can update users password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'salah')
            .send({})
        expect(result.status).toBe(401)
    })
})