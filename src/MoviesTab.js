import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MovieItem from './components/MovieItem'; 

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchType, setSearchType] = useState('nowPlaying');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const API_KEY = '';

  const fetchMovies = () => {
    setLoading(true);
    let url = '';
    switch (searchType) {
      case 'nowPlaying':
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        break;
      case 'topRated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
        break;
      case 'upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`;
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovies(prevMovies => [...prevMovies, ...data.results]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies();
  }, [searchType]);

  const loadMore = () => {
    if (!loading) {
        fetchMovies();
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <Picker
          selectedValue={searchType}
          onValueChange={(itemValue) => setSearchType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Now Playing" value="nowPlaying" />
          <Picker.Item label="Popular" value="popular" />
          <Picker.Item label="Top Rated" value="topRated" />
          <Picker.Item label="Upcoming" value="upcoming" />
        </Picker>
      </View>
      
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    marginTop: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,

  },
  picker: {
    width: '50%',
    alignSelf: 'center',
    padding: 10,

  },
  required: {
    color: 'red',
  },
});

export default MoviesScreen;
