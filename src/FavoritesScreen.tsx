import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FavoriteIcon} from '../components/FavoriteIcon';
import {Status} from '../components/Status';

type Props = {
  onPress: (item: CatMini) => void;
  catExist: (id: string) => {};
  favorited: CatMini[];
};

const FavoritesScreen = ({onPress, catExist, favorited}: Props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {!!favorited.length ? (
          favorited.map(cat => (
            <View testID="favorites-view" key={cat.name} style={styles.catView}>
              <Image
                style={styles.image}
                source={{
                  uri: cat.image,
                }}
              />
              <View style={styles.llkeView}>
                <Text>{cat.name}</Text>
                <TouchableOpacity onPress={() => onPress(cat)}>
                  {catExist(cat.id) ? <FavoriteIcon like /> : <FavoriteIcon />}
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Status>
            <Text>Favorited pets appear here</Text>
          </Status>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 8,
  },
  llkeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  catView: {
    padding: 10,
    backgroundColor: '#fff',
    width: '50%',
    flexDirection: 'column',
  },
});

export default FavoritesScreen;
