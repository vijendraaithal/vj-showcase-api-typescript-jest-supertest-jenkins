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

    it('GET /posts/{id}', async() => {
        const res = await req.get('/posts/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body.userId).toEqual(1);
        expect(res.body.id).toEqual(1);
        expect(res.body.title).toContain('occaecati');
        expect(res.body.body).toContain('consequuntur');
    });
});