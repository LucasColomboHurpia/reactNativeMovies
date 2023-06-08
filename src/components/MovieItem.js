import React from 'react';
import { View, Text, Image, Button, StyleSheet, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const MovieItem = ({ item }) => {
  const navigation = useNavigation();
  
   // Check if 'movie' and 'movie.poster_path' is defined before trying to access it
   const imgSrc = item && item.poster_path ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` } : null;

  
  return(
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

          {/* {item.original_language ? <Text>Original Language: {item.original_language}</Text> : null} */}
          {/* <Text>Overview: {item.overview}</Text> */}
          <Button title="More Details" onPress={() => navigation.navigate('Detail', { item: item })} />
          </View>
  </View>
);
}

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    padding: 10,
    height: 200, 
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
    flexGrow: 1, 
    justifyContent: 'flex-start',
},

  movieTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

});

export default MovieItem;
