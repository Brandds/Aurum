import { StyleSheet, Text, View } from "react-native"
import { Colors } from "../../styles/constants"


export const UserView = () => {
  return (
    <View style={styles.container}>
      <Text>UserView</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.fundo,
    width: '100%',
  },
})