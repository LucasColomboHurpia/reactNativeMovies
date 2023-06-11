import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MovieItem from './components/MovieItem'; // Import MovieItem

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [error, setError] = useState(''); // Add this line to track the error


    let API_KEY = '';

  const fetchMovies = () => {
    // Add validation here
    if (search.trim() === '') {
      setError('Search field cannot be empty');
      return;
    }
    setError(''); // Clear the error if it exists

    let url = '';
    // If the search is empty, replace it with 'a'
    let query = search || 'a';
    switch (searchType) {
      case 'movie':
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        break;
      case 'tv':
        url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`;
        break;
      case 'multi':
        url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`;
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => console.log(error));
  }

  const filteredMovies = movies.filter(movie =>
    (movie.title && movie.title.toLowerCase().includes(search.toLowerCase())) ||
    (movie.name && movie.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <Text>
        Search Movie/TV Show Name: 
        <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setSearch(text)}
        value={search}
        placeholder="i.e. James Bond, CSI"
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
          <Picker.Item label="Movies" value="movie" />
          <Picker.Item label="TV Shows" value="tv" />
          <Picker.Item label="Both" value="multi" />
        </Picker>
        <Button 
          title="Search" 
          onPress={fetchMovies} 
        />
      </View>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />} // Make sure 'item' is defined
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
    padding: 12,
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

export default SearchScreen;
