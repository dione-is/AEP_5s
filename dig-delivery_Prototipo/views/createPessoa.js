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
import {
  Button,
  Card,
  Title,
  List,
  Checkbox,
  TextInput,
} from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';
import { baseUrl } from './url';
import axios from 'axios';

function createPessoa({ navigation }) {
  const [nome, setNome] = React.useState();
  const [email, setEmail] = React.useState();
  const [telefone, setTelefone] = React.useState();
  const [senha, setSenha] = React.useState();
  const [checked, setChecked] = React.useState();

  const salvar = () => {
    axios
      .post(`${baseUrl}/pessoa`, {
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
      })
      .then((response) => {
        navigation.navigate('endereco', {
          idPessoa: response.data._id,
          entregador: checked ? true : false,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          <Title>Cadastro Pessoa</Title>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            outlineColor="#fbbc04"
            activeOutlineColor="#fbbc04"
            theme={inputTheme}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            outlineColor="#fbbc04"
            activeOutlineColor="#fbbc04"
            theme={inputTheme}
          />
          <Text style={styles.label}>Telefone</Text>
          <MaskedTextInput
            mask="(99)99999-9999"
            value={telefone}
            onChangeText={(telefone, rawTelefone) => {
              setTelefone(rawTelefone);
            }}
            style={styles.input}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            mode="outlined"
            outlineColor="#fbbc04"
            activeOutlineColor="#fbbc04"
            theme={inputTheme}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color="#fbbc04"
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.label}>deseja ser entregador ?</Text>
          </View>
          <Button
            mode="contained"
            style={{ backgroundColor: '#fbbc04', marginTop: 100 }}
            labelStyle={{ color: 'white' }}
            onPress={() => salvar()}>
            Avançar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default createPessoa;

const inputTheme = {
  colors: { primary: '#fbbc04', text: 'black' },
};

const styles = StyleSheet.create({
  fundoTela: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 10,
  },

  label: {
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
