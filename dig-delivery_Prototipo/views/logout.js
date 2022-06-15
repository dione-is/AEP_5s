import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-paper';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecundary from '../components/ButtonSecundary';

const logo = require('../imagens/Logo.png');

function login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.backgroundColor}>
          <Image style={styles.logo} source={logo} />
          <View>
            <ButtonPrimary
              name="Sou Cliente"
              label="#fbbc04"
              mode="contained"
              rota={() => navigation.navigate('login')}
            />
            <ButtonSecundary
              name="Não sou Cliente"
              label="white"
              color="#fbbc04"
              rota={() => navigation.navigate('createPessoa')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default login;

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: '#fbbc04',
    alignItems: 'center',
    paddingTop: 30,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#fbbc04'
  },

  logo: {
    marginTop: 180,
    marginBottom: 35,
  },
});
