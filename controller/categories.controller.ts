import * as supertest from 'supertest';
import config from '../config/base.config';
const req = supertest(config.baseUrl);

class CategoriesController {
    getCategories() {
        return req.get('/categories');
    }

    getCategoryById(id: string) {
        return req.get('/categories/' + id);
    }

    postCategory(data: {[key: string]: string}) {
        return req.post('/categories')
                .send(data);
    }

    putCategories(id: string,data: {[key: string]: string | number}) {
        return req.put('/categories/' + id)
                .send(data);
    }

    deleteCategory(id: string) {
        return req.delete('/categories/' + id);
    }
}

export default new CategoriesController();