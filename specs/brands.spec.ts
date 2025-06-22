import * as supertest from 'supertest';
const req = supertest('https://practice-react.sdetunicorns.com/api/test');
import {faker} from '@faker-js/faker';

describe('Brand API Test Suite', () => {
    let newBrand: any;
    describe('Fetch Brands', () => {
        it('GET Brands', async() => {
            const res = await req.get('/brands');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
            expect(res.body[0]).toHaveProperty('_id');
            expect(res.body[0]).toHaveProperty('name');
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
        },10000);
    });

    describe('Create & Fetch Brand', () => {

        describe('Create Brands', () => {
            it('POST Brand', async() => {
                const brandName = "BN" 
                    + faker.company.buzzVerb() 
                    + faker.string.alpha({length: {min: 5, max: 7}});
                const data = {
                    name: brandName,
                    description: "BD" + brandName
                }
                const res = await req.post('/brands')
                    .send(data);
                expect(res.statusCode).toEqual(200);
                expect(res.body.name).toEqual(data.name);
                expect(res.body).toHaveProperty('createdAt');
                newBrand = res.body;
            });

            it('Schema Validation - Name is mandatory field', async() => {
                const brandName = '';
                const data = {
                    name: brandName,
                    description: "BD" + brandName
                }
                const res = await req.post('/brands')
                    .send(data);
                expect(res.statusCode).toEqual(422);
                expect(res.body.error).toEqual('Name is required');
            });

            it('Business Logic - Duplicate brand entries are not allowed', async() => {
                const brandName = "BN" 
                    + faker.company.buzzVerb() 
                    + faker.string.alpha({length: {min: 5, max: 7}});
                const data = {
                    name: brandName,
                    description: "BD" + brandName
                }
                const res = await req.post('/brands')
                    .send(data);
                expect(res.statusCode).toEqual(200);
                const res2 = await req.post('/brands')
                    .send(data);
                expect(res2.statusCode).toEqual(422);
                const expectedErrorMessage= `${brandName} already exists`;
                expect(res2.body.error).toEqual(expectedErrorMessage);
            });
        });

        it('GET Brand', async() => {
            const res = await req.get('/brands/' + newBrand._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(newBrand.name);
        });
    });

    describe('Update Brand', () => {
        it('PUT Brand', async() => {
            const brandName = "UPD-BN" 
                + faker.company.buzzVerb() 
                + faker.string.alpha({length: {min: 5, max: 7}});
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(data.name);
            expect(res.body).toHaveProperty('createdAt');
        });
    });

    describe('Delete Brand', () => {
        it('DELETE Brand', async() => {
            const res = await req.delete('/brands/' + newBrand._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeNull();
        });
    });
});