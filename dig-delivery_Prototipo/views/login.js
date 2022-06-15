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
import { Button, TextInput, Checkbox, Snackbar } from 'react-native-paper';
import ButtonPrimary from '../components/ButtonPrimary';

const logo = require('../imagens/Logo.png');

function login({ navigation, route }) {
  const [login, setLogin] = React.useState();
  const [senha, setSenha] = React.useState();
  const [entregador, setEntregador] = React.useState(false);
  const [visible, setVisible] = React.useState(route.params?.visible);

  const acesso = () => {
    entregador == true
      ? navigation.navigate('indexEntregador')
      : navigation.navigate('index');
  };
  
  const onDismissSnackBar = () => {
    setVisible(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.backgroundColor}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
          >
            Cadastro Efetuado com Sucesso
          </Snackbar>
          <View style={{ alignItems: 'center' }}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View>
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              placeholder="Email"
              value={login}
              onChangeText={setLogin}
              style={{ marginBottom: 20 }}
            />
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
            />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Checkbox
                status={entregador ? 'checked' : 'unchecked'}
                color="black"
                uncheckedColor="black"
                onPress={() => {
                  setEntregador(!entregador);
                }}
              />
              <Text style={{ marginTop: 8, fontWeight: 'bold' }}>
                Sou Entregador
              </Text>
            </View>
            <ButtonPrimary
              name="Acessar"
              mode="contained"
              label="#fbbc04"
              rota={acesso}
            />
            <Text style={styles.esqueciSenha}>Esqueci a senha</Text>
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
    padding: 40,
    paddingTop: 30,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#fbbc04',
    paddingTop: 20,
  },

  esqueciSenha: {
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 30,
  },

  logo: {
    marginTop: 30,
    marginBottom: 60,
    width: 120,
    height: 100,
  },
});

const inputTheme = {
  colors: { primary: '#fbbc04', text: 'black' },
};
