import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ item }) => {
  const navigation = useNavigation();

  const imgSrc = item && item.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` } : null;

  return (
    <View style={styles.movieItem}>
      <Image
        style={styles.poster}
        source={imgSrc}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>
          {item.title ? item.title : item.name}
        </Text>

        <Text>Popularity: {item.popularity}</Text>
        {item.origin_country ? <Text>Origin Country: {item.origin_country.join(', ')}</Text> : null}

        <Text>
          {item.release_date ? `Release Date: ${item.release_date}` : `First Aired: ${item.first_air_date}`}
        </Text>

        <Button
          title="More Details"
          style={styles.buttonDetails}
          onPress={() => {
            const mediaType = item.first_air_date ? 'tv' : 'movie';
            navigation.navigate('Detail', { movie_id: item.id, mediaType: mediaType })
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    height: 190,
    width: Dimensions.get('window').width,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonDetails:{
    borderRadius: '15px',
  }
});

export default MovieItem;
