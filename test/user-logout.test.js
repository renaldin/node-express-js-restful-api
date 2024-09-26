import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js"

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it ('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data).toBe('Ok')

        const user = await getTestUser()
        expect(user.token).toBeNull()
    })

    it ('Should can reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah')
        expect(result.status).toBe(401)
    })
})