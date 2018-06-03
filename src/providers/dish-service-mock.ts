import {Injectable} from '@angular/core';
import dishes from './mock-dishes';

@Injectable()
export class DishService {

    findAll() {
        return Promise.resolve(dishes);
    }

    findById(id) {
        return Promise.resolve(dishes[id - 1]);
    }

}
