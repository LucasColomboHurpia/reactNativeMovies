import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';

import MoviesScreen from './src/MoviesTab';
import SearchScreen from './src/SearchTab';
import TVShowsScreen from './src/TVShowsScreen';
import DetailScreen from './src/DetailScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Movies App</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={MoviesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="TV Shows" component={TVShowsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 60,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
