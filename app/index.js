// App.js
import React from 'react';
import { View, Text,Button } from 'react-native';
import tw from '../app/talwind'; // adjust the path if necessary

export default function App() {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg`}>Hello, Tailwind!</Text>
      <Button style={tw`text-white text-sm`}
        title='Click Me'
        onPress={()=>alert('Hello, Tailwind')}
        />
    </View>
  );
}

