import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image
            style={styles.avatar}
            source={require("../../assets/User.png")}
          />
        </View>
        <View style={styles.user}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.post} />
            <Text>{item.userData.name}</Text>
            <View style={styles.navBtn}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen")}
              >
                <Text>Coments</Text>
                <Ionicons name="chatbubble-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", { coords: item.coords })
                }
              >
                <Text>{item.userData.location}</Text>

                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 60,
    alignItems: "center",
  },
  imgBox: {
    width: 60,
    height: 60,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  post: {
    marginTop: 32,
    height: 240,
    width: 370,
    borderRadius: 8,
  },
  navBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
