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

  let API_KEY = 'b0bb4c8d5e0c7614ef42e57f4887dff0';

  const fetchMovies = () => {
    console.log('clicked');
    let url = '';
    switch (searchType) {
      case 'nowPlaying':
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
        break;
      case 'popular':
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        break;
      case 'topRated':
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
        break;
      case 'upcoming':
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.results[0]);
        setMovies(data.results);
        setRefresh(!refresh);
      })
      .catch(error => console.log(error));
  }


  const filteredMovies = movies.filter(movie =>
    movie.title && movie.title.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <View style={styles.container}>
        <Text>Search Movie Name:</Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setSearch(text)}
        value={search}
        placeholder="Search..."
      />
      <Text style={styles.label}>Choose Search Type</Text>
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
        <Button title="Search" onPress={fetchMovies} />
      </View>
      <FlatList
        data={filteredMovies}
        extraData={refresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />}
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
});

export default MoviesScreen;
