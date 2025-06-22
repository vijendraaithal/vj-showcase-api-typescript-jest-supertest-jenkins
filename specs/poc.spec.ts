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

    it('GET /posts/{id}/comments', async() => {
        const res = await req.get('/posts/1/comments');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(5);
        expect(res.body[0].email).toEqual('Eliseo@gardner.biz');
        expect(res.body[1].email).toEqual('Jayne_Kuhic@sydney.com');
        expect(res.body[2].email).toEqual('Nikita@garfield.biz');
        expect(res.body[3].email).toEqual('Lew@alysha.tv');
        expect(res.body[4].email).toEqual('Hayden@althea.biz');
    });

    it('GET /comments?postId={id}', async() => {
        const res = await req.get('/comments')
            .query({postId: 1});
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(5);
    }, 10000);
});

describe('POST Requests', () => {
    it('PUT /posts/{id}', async() => {
        const data = {
            "userId": 1,
            "title": "New Title",
            "body": "New Body"
        }
        const res = await req.post('/posts')
            .send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.body).toEqual(data.body);
    });
});

describe('PUT Requests', () => {
    it('PUT /posts/{id}', async() => {
        const data = {
            "userId": 1,
            "title": "Updated Title",
            "body": "New Body"
        }
        const res = await req.put('/posts/1')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.body).toEqual(data.body);
    });
});

describe('PATCH Requests', () => {
    it('PATCH /posts/{id}', async() => {
        const data = {
            "title": "Only Updated Title"
        }
        const res = await req.put('/posts/1')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(data.title);
    });
});