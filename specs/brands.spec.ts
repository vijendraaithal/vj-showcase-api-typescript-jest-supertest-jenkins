import * as supertest from 'supertest';
const req = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Fetch Brands', () => {
    it('GET Brands', async() => {
        const res = await req.get('/brands');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('name');
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    }, 10000);

    it('GET Brand', async() => {
        const res = await req.get('/brands/6628a70b986188d4dce47f4f');
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('apple');
    });
});

describe('Create Brand', () => {
    
    it.only('POST Brand', async() => {
        const data = {
            name: 'vj-test-brand 22Jun25 Set 01',
            description: 'Description vj-test-brand 22Jun25 Set 01'
        }
        const res = await req.post('/brands')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body).toHaveProperty('createdAt');
    });
});