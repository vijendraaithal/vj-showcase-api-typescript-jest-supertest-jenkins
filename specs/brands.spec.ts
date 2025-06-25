import * as supertest from 'supertest';
const req = supertest('https://practice-react.sdetunicorns.com/api/test');
import {faker} from '@faker-js/faker';

describe('Brand API Test Suite', () => {
    let newBrand: any;
    describe('Fetch Brands', () => {
        it('TC01 - Validate - Get all brands & properties of first brand', async() => {
            const res = await req.get('/brands');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
            expect(res.body[0]).toHaveProperty('_id');
            expect(res.body[0]).toHaveProperty('name');
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
        },30000);
    });

    describe('Create Brands', () => {
        let postBrand: any;
        const brandName = "BN" 
            + faker.company.buzzVerb() 
            + faker.string.alpha({length: {min: 5, max: 7}});
        const data = {
            name: brandName,
            description: "BD" + brandName
        }
        beforeAll(async() => {
            postBrand = await req.post('/brands')
                .send(data);
        });
        it('TC02 - Validate - Creation of a new brand', async() => {
            expect(postBrand.statusCode).toEqual(200);
            expect(postBrand.body.name).toEqual(data.name);
            expect(postBrand.body).toHaveProperty('createdAt');
        });

        it('TC03 - Validate - name is mandatory field', async() => {
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

        it('TC04 - Validation - min char length for name it greater than 1', async() => {
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

        it('TC05 - Validate - duplicate brand entries are not allowed', async() => {
            // second request with same data
            const res = await req.post('/brands')
                .send(data);
            expect(res.statusCode).toEqual(422);
            const expectedErrorMessage= `${brandName} already exists`;
            expect(res.body.error).toEqual(expectedErrorMessage);
        });
    });

    describe('Fetch Individual Brand', () => {
        let postBrand: any;
        const brandName = "BN" 
            + faker.company.buzzVerb() 
            + faker.string.alpha({length: {min: 5, max: 7}});
        const data = {
            name: brandName,
            description: "BD" + brandName
        }
        beforeAll(async() => {
            postBrand = await req.post('/brands')
                .send(data);
        });

        it('TC06 - Validate - search on invalid brand throws expected error', async() => {
            const randomId = Math.round(Date.now()/1000).toString(16) + faker.string.numeric({length: 16}) ;
            const res = await req.get('/brands/' + randomId);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual('Brand not found.');
        }, 30000);


        it('TC07 - Validate - successful brand search on a valid brand id', async() => {
            const res = await req.get('/brands/' + postBrand.body._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(postBrand.body.name);
        });
    });

    describe('Update Brand', () => {
        
        let postBrand: any;
        const brandName = "BN" 
            + faker.company.buzzVerb() 
            + faker.string.alpha({length: {min: 5, max: 7}});
        const data = {
            name: brandName,
            description: "BD" + brandName
        }
        beforeAll(async() => {
            postBrand = await req.post('/brands')
                .send(data);
            console.log(postBrand.body);
        });

        it.only('TC08 - Validate - update of brand name', async() => {
            const dataUpdated = {
                name: "UPD" + brandName
            }
            const res = await req.put('/brands/' + postBrand.body._id)
                .send(dataUpdated);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(dataUpdated.name);
            expect(res.body).toHaveProperty('createdAt');
        });

        it('TC09 - Validate - brand name cannot be accept GT 30 chars', async() => {
            const brandName = faker.string.alphanumeric(31);
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.body.error).toEqual('Brand name is too long');
        });

        it('TC10 - Validate - brand name must be a string', async() => {
            const brandName = faker.number.int({min:1000000, max:99999999});
            const data = {
                name: brandName,
                description: "BD" + brandName
            }
            const res = await req.put('/brands/' + newBrand._id)
                .send(data);
            expect(res.body.error).toEqual('Brand name must be a string');
        });

        it('TC11 - Validate - brand description must be a string', async() => {
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

        it('TC12 - Validate - error on trying to update an invalid brand id', async() => {
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
        it('TC13 - Validate - deletion of a brand', async() => {
            const res = await req.delete('/brands/' + newBrand._id);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeNull();
        });

        it('TC14 - Validate - error on trying to delete an invalid brand id', async() => {
            const res = await req.delete('/brands/' + '1234567890123456789012345')
            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toEqual('Unable to delete brand'); 
        });
    });
});