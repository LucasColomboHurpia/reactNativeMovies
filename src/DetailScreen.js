import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
    const { item } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{item.title || item.name}</Text>
            <Image 
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.image}
            />
            <Text style={styles.overview}>{item.overview}</Text>
            <Text style={styles.vote}>Rating: {item.vote_average} | {item.release_date ? `Release Date: ${item.release_date}` : `First Aired: ${item.first_air_date}`}</Text>
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
