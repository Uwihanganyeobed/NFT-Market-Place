// App.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from '../app/talwind'; // adjust the path if necessary

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-blue-500`}>
      <Text style={tw`text-white text-lg`}>Hello, Tailwind!</Text>
    </View>
  );
}

