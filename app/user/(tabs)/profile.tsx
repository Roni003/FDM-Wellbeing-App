import { StyleSheet, Image, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { signOut } from "@/lib/auth";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <FontAwesome5
          name="user-circle"
          size={'100%'}
          color={'rgba(0, 110, 255, 1)'}
      />

      <View style={styles.user}>
        <View style={styles.info}>
          <Text style={styles.info_text}>Name</Text>
          <Text style={styles.info_value}>John Doe</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>Email Address</Text>
          <Text style={styles.info_value}>j.doe@qmul.ac.uk</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>User ID</Text>
          <Text style={styles.info_value}>01</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>Active Forum Posts</Text>
          <Text style={styles.info_value}>0</Text>
        </View>
      </View>
    
      <View style={styles.btn_container}>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btn_container: {
    flex: 1,
    position: 'absolute',
    bottom: '2%',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
    padding: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    overflow: 'hidden',
    width:'30%',
  },
  user: {
    width: '80%',
  },
  info: {
    margin: '1%',
    marginTop: '2%',
  },
  info_text: {
    marginLeft: '2%',
  },
  info_value: {
    fontSize: 17,
    fontWeight: '500',
    backgroundColor: 'rgba(210, 210, 210, 0.3)',
    padding: '2%',
    margin: '1%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    overflow: 'hidden',
  }
});
