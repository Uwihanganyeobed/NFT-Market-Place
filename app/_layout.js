import * as WebBrowser from "expo-web-browser";
import { View, Text, StyleSheet, Button } from "react-native";
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function _layout() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "1082702847729-4kh0llgipu9gh1l6sbd5vbp7c30qa3rs.apps.googleusercontent.com",
    androidClientId:
      "1082702847729-etdqdjrl5bbsm3dmiu1b7s3lha9av3mm.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);
  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
      await getUserInfo();
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer  ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // add your own error here
    }
  };
  return (
    <View className="flex mt-10 pt-20">
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Text className="text-teal-500">Code with Obed</Text>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
      <Button
        title="delete local storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
    </View>
  );
}
