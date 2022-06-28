import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoriteIcon } from './FavoriteIcon';

type ListItemProps = {
  item: CatMini;
  onPress: () => void;
  catExist: boolean;
};
const ListItem = ({ item, onPress, catExist }: ListItemProps) => (
  <View
    testID='list-item'
    style={styles.listStyle}>
    <Image
      style={styles.image}
      source={{ uri: item?.image }}
    />
    <Text testID='pet' style={{ flex: 1 }}>{item.name}</Text>
    <TouchableOpacity
      testID='like-button'
      onPress={onPress}>
      {catExist ? <FavoriteIcon like /> : <FavoriteIcon />}
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  listStyle: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 8,
  }
})

export default ListItem