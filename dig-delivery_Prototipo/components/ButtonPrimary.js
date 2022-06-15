import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function ButtonPrimary({name, mode, rota, navigation, label}) {
  return (
    <View>
      <Button 
        style = {styles.button}
        mode = {mode}
        onPress= {rota}
        labelStyle={{color:label, fontWeight: 'bold'}}
      >{name}</Button>
    </View>
  );
}
export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 60,
    marginBottom: 20,
    padding: 3,
    marginTop: 180,
  },
});
