import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import fetch from 'node-fetch';
import {HomeScreen} from './src/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AllCats, CatsILike} from './components/BottomIcons';
import FavoritesScreen from './src/FavoritesScreen';
import {minifyCats} from './misc/functions';
import {addItem, getCats, getItems, removeItem} from './misc/apiAndStorage';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fetchCatsState, setFetchCatsState] = useState<CatMini[]>([]);
  const [loading, setLoading] = useState<
    'idle' | 'loading' | 'success' | 'failed'
  >('idle');
  const [favorited, setFavorited] = useState<CatMini[]>([]);

  const getItemsFromStorage = async () => {
    let response = await getItems();
    if (response.length) setFavorited(response);
  };

  const catExist = (id: string) => {
    return [...favorited].filter(a => a.id === id).length === 1;
  };

  // const clearStorage = async () => {
  //   //not in use.
  //   await AsyncStorage.clear();
  // };

  const removeItemFromStorage = async (id: string) => {
    // unlike cat!
    try {
      let response = await removeItem(id, catExist, favorited);
      if (response) setFavorited(response);
    } catch (e) {
      console.log(e);
    }
  };

  const AddItemToStorage = async (item: CatMini) => {
    // like cat!
    //check storage for pet
    try {
      let response = await addItem(item, catExist, favorited);
      if (response) setFavorited(response);
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const getCatData = async () => {
    try {
      setLoading('loading');
      let response: any = await getCats();
      // if (response) throw 'something went wrong';
      setFetchCatsState(response);
      setLoading('success');
    } catch (e: unknown) {
      setLoading('failed');
      // console.log(e);
    }
  };

  const likeOrUnlike = (item: CatMini) => {
    !catExist(item.id)
      ? AddItemToStorage(item)
      : removeItemFromStorage(item.id);
  };

  useEffect(() => {
    getCatData();
    getItemsFromStorage();

    // return () => {}
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="All Cats"
          children={() => (
            <HomeScreen
              loading={loading === 'loading'}
              error={loading === 'failed'}
              onPress={likeOrUnlike}
              catExist={catExist}
              fetchCatsState={fetchCatsState}
            />
          )}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? 'black' : 'grey'}}>All cats</Text>
            ),
            tabBarIcon: ({focused}) => <AllCats opacity={focused} />,
          }}
        />
        <Tab.Screen
          name="Cats I Like"
          children={() => (
            <FavoritesScreen
              onPress={likeOrUnlike}
              catExist={catExist}
              favorited={favorited}
            />
          )}
          options={{
            tabBarLabel: ({focused}) => (
              <Text style={{color: focused ? 'black' : 'grey'}}>
                Cats I Like
              </Text>
            ),
            tabBarIcon: ({focused}) => <CatsILike opacity={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
