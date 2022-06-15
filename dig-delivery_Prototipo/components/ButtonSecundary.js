import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

function ButtonSecundary({name,navigation,rota, label, color}){
  return(
    <View>
      <Button
        labelStyle={{color: label, fontWeight: 'bold'}}
        style = {{backgroundColor: color, borderRadius: 10, paddingVertical: 5}}
        onPress= {rota}
      >{name}</Button>
    </View>
  );
}
export default ButtonSecundary;
