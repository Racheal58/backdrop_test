import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ListItem from '../components/ListItem';
import {Status} from '../components/Status';

interface IProps {
  loading: boolean;
  error: boolean;
  fetchCatsState: CatMini[];
  onPress: (item: CatMini) => void;
  catExist: (id: string) => boolean;
}

export const HomeScreen = ({
  loading,
  error,
  fetchCatsState,
  onPress,
  catExist,
}: IProps) => {
  const renderItem = ({item}: {item: CatMini}) => (
    <ListItem
      item={item}
      onPress={() => onPress(item)}
      catExist={catExist(item.id)}
    />
  );

  return (
    <View testID="homeScreen" style={styles.container}>
      <FlatList
        testID="pets-list"
        data={fetchCatsState}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => {
          if (loading)
            return (
              <Status>
                <ActivityIndicator
                  testID="loadingIndicator"
                  size="large"
                  color="#0c9"
                />
              </Status>
            );

          if (error)
            return (
              <Status>
                <Text></Text>
              </Status>
            );

          return <></>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    width: '100%',
  },
});
