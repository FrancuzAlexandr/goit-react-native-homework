import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const resetForm = () => {
    setState(initialState);
  };

  const onLogin = () => {
    keyboardHide();
    console.log("state", state);
    dispatch(authSignInUser(state));
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.bgImageContainer}>
        <ImageBackground
          source={require("..//../assets/Image/Photo-BG.png")}
          style={styles.BgImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeybord ? 32 : 142,
              }}
              onPress={() => setIsShowKeybord(false)}
            >
              <Text style={styles.title}>Login</Text>
              <View>
                <TextInput
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  maxLength={50}
                  style={{
                    ...styles.input,
                    borderColor:
                      focusedInput === "email" ? "#ff6c00" : "#e8e8e8",
                  }}
                  onFocus={() => {
                    setFocusedInput("email");
                    setIsShowKeybord(true);
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              <View>
                <TextInput
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  maxLength={30}
                  secureTextEntry={!showPassword}
                  style={{
                    ...styles.input,
                    marginTop: 16,
                    borderColor:
                      focusedInput === "password" ? "#ff6c00" : "#e8e8e8",
                  }}
                  onFocus={() => {
                    setFocusedInput("password");
                    setIsShowKeybord(true);
                  }}
                  onBlur={() => setFocusedInput(null)}
                />
                <Text
                  style={styles.showPasswordBtn}
                  onPress={showPasswordHandler}
                >
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </View>
              {isShowKeybord ? null : (
                <>
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.8}
                    onPress={onLogin}
                  >
                    <Text style={styles.btnText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text style={styles.registerText}>
                      Don't have an account? Register
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  BgImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    height: 50,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 32,
    top: 30,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  btn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    borderRadius: 100,
    height: 51,
    marginTop: 43,
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    textAlign: "center",
  },
  registerText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    textAlign: "center",
    marginTop: 16,
  },
});
