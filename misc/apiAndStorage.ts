import AsyncStorage from '@react-native-async-storage/async-storage';
import {minifyCats} from './functions';

export const getItems = async () => {
  try {
    let arr = new Array<CatMini>();
    let response = await AsyncStorage.getItem('favorites');
    if (response) arr = JSON.parse(response);
    return arr;
  } catch (e: unknown) {
    return [];
  }
};

const saveItemsToStorage = async (arr: CatMini[]) =>
  await AsyncStorage.setItem('favorites', JSON.stringify(arr));

export const removeItem = async (
  id: string,
  catExist: (id: string) => {},
  favorited: CatMini[],
) => {
  // unlike cat!
  try {
    if (!catExist(id)) return; // code should not get here but just in case.
    let newFavs = [...favorited].filter(a => a.id !== id);
    saveItemsToStorage(newFavs);
    return newFavs;
  } catch (e) {
    // console.log(e);
  }
};

export const getCats = async () => {
  try {
    let response = await fetch('https://api.thecatapi.com/v1/breeds');
    const data = await response.json();
    return minifyCats(data);
  } catch (e: unknown) {
    return e;
  }
};

export const addItem = async (
  item: CatMini,
  catExist: (id: string) => {},
  favorited: CatMini[],
) => {
  // like cat!
  //check storage for pet
  try {
    if (catExist(item.id)) return; // code should not get here but just in case.
    const allItems = [...favorited, item];
    saveItemsToStorage(allItems);
    return allItems;
  } catch (e: unknown) {
    // console.log(e);
  }
};
