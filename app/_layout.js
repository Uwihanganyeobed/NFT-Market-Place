import * as WebBrowser from "expo-web-browser";
import { View, Text, StyleSheet, Button } from "react-native";
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function _layout() {
  const [userInfo, setUserInfo] = React.useState(null);

  const [requestGoogle, responseGoogle, promptGoogle] = Google.useAuthRequest({
    webClientId:
      "1082702847729-4kh0llgipu9gh1l6sbd5vbp7c30qa3rs.apps.googleusercontent.com",
    androidClientId:
      "1082702847729-etdqdjrl5bbsm3dmiu1b7s3lha9av3mm.apps.googleusercontent.com",
  });

  const [requestFacebook, responseFacebook, promptFacebook] = Facebook.useAuthRequest({
    clientSecret: "bdb74e2d3bd49339179fbbe1105ebea0",
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [responseGoogle]);

  useEffect(() => {
    handleSignInWithFacebook();
  }, [responseFacebook]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (responseGoogle?.type === "success") {
        await getUserInfoGoogle(responseGoogle.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  async function handleSignInWithFacebook() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (responseFacebook?.type === "success") {
        await getUserInfoFacebook(responseFacebook.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfoGoogle = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // add your own error handling here
    }
  };

  const getUserInfoFacebook = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // add your own error handling here
    }
  };

  return (
    <View className="flex mt-10 pt-20">
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Text className="text-teal-500">Code with Obed</Text>
      <Button title="Sign in with Google" onPress={() => promptGoogle()} />
      <Button title="Sign in with Facebook" onPress={() => promptFacebook()} />
      <Button
        title="Delete local storage"
        onPress={() => AsyncStorage.removeItem("@user")}
      />
    </View>
  );
}
