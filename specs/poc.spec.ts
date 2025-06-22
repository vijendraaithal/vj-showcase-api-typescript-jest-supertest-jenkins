import * as supertest from 'supertest';
const req = supertest('https://jsonplaceholder.typicode.com');

describe('GET Requests', () => {
    it('GET /posts', async() => {
        const res = await req.get('/posts');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(100);
        expect(res.body[0]).toHaveProperty('userId');
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('body');
    });
});