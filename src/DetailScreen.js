import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = ({ route }) => {
    const { movie_id, mediaType } = route.params; // Grab the mediaType from route.params
    const API_KEY = '';

    const navigation = useNavigation();

    const [movieDetails, setMovieDetails] = useState(null);

    const fetchDetails = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie_id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovieDetails(data);
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        if(movieDetails) {
            navigation.setOptions({ title: movieDetails.title || movieDetails.name });
        }
    }, [movieDetails]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {movieDetails ? (
                <>
                    <Text style={styles.title}>{movieDetails.title || movieDetails.name}</Text>
                    <Image 
                        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
                        style={styles.image}
                    />
                    <Text style={styles.overview}>{movieDetails.overview}</Text>
                    <Text style={styles.vote}>Rating: {movieDetails.vote_average} | {movieDetails.release_date ? `Release Date: ${movieDetails.release_date}` : `First Aired: ${movieDetails.first_air_date}`}</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: '80%',
        height: 400
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        padding: 30
    },
    vote: {
        fontSize: 16,
        color: 'grey',
        marginTop: 10
    },
    overview: {
        fontSize: 16,
        marginTop: 10,
        padding: 10
    }
});

export default DetailScreen;
