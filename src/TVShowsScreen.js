import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import MovieItem from './components/MovieItem'; // Import MovieItem

const MoviesScreen = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('airingToday');
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(''); // Add this line to track the error

    let API_KEY = 'b0bb4c8d5e0c7614ef42e57f4887dff0';

    const fetchMovies = () => {
        // Add validation here
        if (search.trim() === '') {
            setError('Search field cannot be empty');
            return;
        }
        setError(''); // Clear the error if it exists

        let url = '';
        switch (searchType) {
            case 'airingToday':
                url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&query=${search}`;
                break;
            case 'onTheAir':
                url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&query=${search}`;
                break;
            case 'popular':
                url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&query=${search}`;
                break;
            case 'topRated':
                url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&query=${search}`;
                break;
            default:
                return;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovies(data.results);
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
    }

    const filteredMovies = movies.filter(movie =>
        movie.name && movie.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text>
                Search TV Show Name: 
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
                    <Picker.Item label="Airing Today" value="airingToday" />
                    <Picker.Item label="On the Air" value="onTheAir" />
                    <Picker.Item label="Popular" value="popular" />
                    <Picker.Item label="Top Rated" value="topRated" />
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
