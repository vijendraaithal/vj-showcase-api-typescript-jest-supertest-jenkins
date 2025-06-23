import * as supertest from 'supertest';
const req = supertest('https://practice-react.sdetunicorns.com/api/test');
import {faker} from '@faker-js/faker';

describe('Brand API Test Suite', () => {
    let newBrand: any;
    describe('Fetch Brands', () => {
        it('Validate - Get all brands & properties of first brand', async() => {
            const res = await req.get('/brands');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
            expect(res.body[0]).toHaveProperty('_id');
            expect(res.body[0]).toHaveProperty('name');
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
        },30000);
    });

    describe('Create & Fetch Brand', () => {

        describe('Create Brands', () => {
            it('Validate - Creation of a new brand', async() => {
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

            it('Validate - name is mandatory field', async() => {
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

            it('Validation - min char length for name it greater than 1', async() => {
                const brandName = 'a';
                const data = {
                    name: brandName,
                    description: "BD" + brandName
                }
                const res = await req.post('/brands')
                    .send(data);
                expect(res.statusCode).toEqual(422);
                expect(res.body.error).toEqual('Brand name is too short');
            });

            it('Validate - duplicate brand entries are not allowed', async() => {
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

        it('Validate - search on invalid brand throws expected error', async() => {
            const randomId = Math.round(Date.now()/1000).toString(16) + faker.string.numeric({length: 16}) ;
            const res = await req.get('/brands/' + randomId);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual('Brand not found.');
        }, 30000);


        it('Validate - successful brand search on a valid brand id', async() => {
            const res = await req.get('/brands/' + newBrand._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(newBrand.name);
        });
    });

    describe('Update Brand', () => {
        it('Validate - update of brand name', async() => {
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

        it('Validate - brand name cannot be accept GT 30 chars', async() => {
            const brandName = faker.string.alphanumeric(31);
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.body.error).toEqual('Brand name is too long');
        });

        it('Validate - brand name must be a string', async() => {
            const brandName = faker.number.int({min:1000000, max:99999999});
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.body.error).toEqual('Brand name must be a string');
        });

        it('Validate - brand description must be a string', async() => {
            const brandName = "BN" 
                    + faker.company.buzzVerb() 
                    + faker.string.alpha({length: {min: 5, max: 7}});
            const description = faker.number.int({min:1000000, max:99999999});
            const data = {
                name: brandName,
                description: description
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.body.error).toEqual('Brand description must be a string');
        });

        it('Validate - error on trying to update an invalid brand id', async() => {
            const brandName = "BN" 
                + faker.company.buzzVerb() 
                + faker.string.alpha({length: {min: 5, max: 7}});
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + '1234567890123456789012345')
                .send(data);
            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toEqual('Unable to update brands'); 
        });
    });

    describe('Delete Brand', () => {
        it('Validate - deletion of a brand', async() => {
            const res = await req.delete('/brands/' + newBrand._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeNull();
        });

        it('Validate - error on trying to delete an invalid brand id', async() => {
            const res = await req.delete('/brands/' + '1234567890123456789012345')
            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toEqual('Unable to delete brand'); 
        });
    });
});