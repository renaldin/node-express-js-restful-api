import supertest from "supertest"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestContacts, removeTestUser } from "./test-util.js"

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await createTestUser()
        await createManyTestContact()
    })

    afterEach(async () => {
        await removeAllTestContacts()
        await removeTestUser()
    })

    it ('Should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.data.length).toBe(10)
        expect(result.body.data.paging.page).toBe(1)
        expect(result.body.data.paging.total_page).toBe(2)
        expect(result.body.data.paging.total_item).toBe(15)
    })

    it ('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                page: 2
            })
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.data.length).toBe(5)
        expect(result.body.data.paging.page).toBe(2)
        expect(result.body.data.paging.total_page).toBe(2)
        expect(result.body.data.paging.total_item).toBe(15)
    })

    it ('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                name: 'test1'
            })
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.data.length).toBe(6)
        expect(result.body.data.paging.page).toBe(1)
        expect(result.body.data.paging.total_page).toBe(1)
        expect(result.body.data.paging.total_item).toBe(6)
    })

    it ('should can search using email', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                email: 'test1'
            })
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.data.length).toBe(6)
        expect(result.body.data.paging.page).toBe(1)
        expect(result.body.data.paging.total_page).toBe(1)
        expect(result.body.data.paging.total_item).toBe(6)
    })

    it ('should can search using phone', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                phone: '089123451'
            })
            .set('Authorization', 'test')
        expect(result.status).toBe(200)
        expect(result.body.data.data.length).toBe(6)
        expect(result.body.data.paging.page).toBe(1)
        expect(result.body.data.paging.total_page).toBe(1)
        expect(result.body.data.paging.total_item).toBe(6)
    })
})