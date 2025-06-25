import * as supertest from 'supertest';
import config from '../config/base.config';
const req = supertest(config.baseUrl);

class BrandController {
    getBrands() {
        return req.get('/brands');
    }

    getBrandById(id: string) {
        return req.get('/brands/' + id);
    }

    postBrands(data: {[key: string]: string}) {
        return req.post('/brands')
                .send(data);
    }

    putBrands(id: string,data: {[key: string]: string | number}) {
        return req.put('/brands/' + id)
                .send(data);
    }

    deleteBrand(id: string) {
        return req.delete('/brands/' + id);
    }
}

export default new BrandController();