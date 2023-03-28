import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, route.params]);
    }
  }, [route.params]);

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
});
