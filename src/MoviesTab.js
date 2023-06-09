import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MovieItem from './components/MovieItem'; // Import MovieItem

const MoviesScreen = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('nowPlaying');
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Add this line to track the error

  let API_KEY = '';

  const fetchMovies = () => {
    // Add validation here
    if (search.trim() === '') {
      setError('Search field cannot be empty');
      return;
    }
    setError(''); // Clear the error if it exists

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

  const loadMore = () => {
    if (!loading) {
        fetchMovies();
    }
  }

  const filteredMovies = movies.filter(movie =>
    movie.title && movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
        <Text>
          Search Movie Name: 
          <Text style={styles.required}>*</Text>
        </Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setSearch(text)}
        value={search}
        placeholder="Search..."
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.label}>
        Choose Search Type
        <Text style={styles.required}>*</Text>
      </Text>
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
        <Button 
          title="Search" 
          onPress={fetchMovies} 
        />
      </View>
      <FlatList
        data={filteredMovies}
        extraData={refresh}
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
    alignItems: 'flex-start',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  label: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  picker: {
    flex: 1,
  },
  error: {
    color: 'red',
  },
  required: {
    color: 'red',
  },
});

export default MoviesScreen;
