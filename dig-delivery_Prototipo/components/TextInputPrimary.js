import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

function TextInputPrimary({placeholder}) {
  return(
    <View>
      <TextInput
          mode = 'outlined'
          outlineColor="#fbbc04"
          activeOutlineColor="#fbbc04"
          placeholder = {placeholder}
          theme = {yellowTheme}    
        />
    </View>
  );
}
export default TextInputPrimary;

const yellowTheme = {
  colors: {primary: "#fbbc04", text: 'black'}
}