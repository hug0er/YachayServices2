import {Injectable} from '@angular/core';
import restaurants from './mock-restaurants';

@Injectable()
export class RestaurantService {

  favoriteCounter: number = 0;
  favorites: Array<any> = [];

  findAll() {
    return Promise.resolve(restaurants);
  }

  findById(id) {
    return Promise.resolve(restaurants[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(restaurants.filter((restaurant: any) =>
        (restaurant.title +  ' ' +restaurant.address +  ' ' + restaurant.city + ' ' + restaurant.description).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(restaurant) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, restaurant: restaurant});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }

}
