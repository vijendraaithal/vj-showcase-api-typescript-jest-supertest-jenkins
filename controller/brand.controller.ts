import * as supertest from 'supertest';
const req = supertest('https://practice-react.sdetunicorns.com/api/test');

class BrandController {
    getBrands() {
        return req.get('/brands');
    }

    getBrandsById(id: string) {
        return req.get('/brands/' + id);
    }

    postBrands(data: {[key: string]: string}) {
        return req.post('/brands')
                .send(data);
    }

    putBrands(id: string,data: {[key: string]: string}) {
        return req.put('/brands/' + id)
                .send(data);
    }

    deleteBrands(id: string) {
        return req.delete('/brands/' + id);
    }
}

export default new BrandController();