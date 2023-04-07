import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  name: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(initialState);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [coords, setCoords] = useState(null);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");

  const { userId, login } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setCoords(coords);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("PostsScreen");
    onPressReset();
  };
  const onPressReset = () => {
    setPhoto("");
    setUserData(initialState);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      coords,
      userId,
      login,
      userData,
      title,
      locationName,
    });
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const data = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytesResumable(data, file);
    const downloadPhoto = await getDownloadURL(data);
    return downloadPhoto;
  };

  return (
    <View style={styles.container}>
      <View style={styles.fotoBox}>
        <Camera style={styles.camera} ref={setCameraRef}>
          {photo && (
            <View style={styles.previewPhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 100, width: 100 }}
              />
            </View>
          )}

          <TouchableOpacity style={styles.icon} onPress={takePhoto}>
            <FontAwesome name="camera" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <Text style={styles.text}>Load photo</Text>
      <View>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Name"
          style={styles.input}
          onChangeText={setTitle}
          // value={userData.name}
          // onChangeText={(value) =>
          //   setUserData((prevState) => ({ ...prevState, name: value }))
          // }
        ></TextInput>

        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Location"
          style={styles.input}
          onChangeText={setLocationName}
          // value={userData.location}
          // onChangeText={(value) =>
          //   setUserData((prevState) => ({ ...prevState, location: value }))
          // }
        ></TextInput>
      </View>
      <View style={styles.tabBarWrapper}></View>
      {photo ? (
        <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonTextActive}>Publish</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.trashBtn}
        activeOpacity={0.7}
        onPress={onPressReset}
      >
        <Feather name="trash-2" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  fotoBox: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 240,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: 343,
    height: 240,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  headerWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    marginBottom: 11,
    fontSize: 17,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,
  },
  previewPhotoContainer: {
    position: "absolute",
    marginTop: 32,
    marginHorizontal: 16,
  },
  previewPhoto: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
  text: {
    color: "#BDBDBD",
  },
  input: {
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#BDBDBD",
  },
  buttonTextActive: {
    color: "#fff",
  },
  trashBtn: {
    marginTop: "auto",
    alignSelf: "center",
  },
});
