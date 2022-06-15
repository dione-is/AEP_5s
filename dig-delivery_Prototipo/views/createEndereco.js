import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
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
import ButtonSecundary from '../components/ButtonSecundary';
import { baseUrl } from './url';
import axios from 'axios';

const inputTheme = {
  colors: { primary: '#fbbc04', text: 'black' },
};

function createEndereco({ navigation, route }) {
  const [logadouro, setLogadouro] = React.useState();
  const [numero, setNumero] = React.useState();
  const [bairro, setBairro] = React.useState();
  const [cep, setCep] = React.useState();
  const [cidade, setCidade] = React.useState();
  const [estado, setEstado] = React.useState();
  const [idPessoa, setIdPessoa] = React.useState(route.params?.idPessoa);
  const [isVisible, setIsVisible] = React.useState(false);

  const salvar = () => {
    axios
      .post(`${baseUrl}/endereco`, {
        logadouro,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        idPessoa,
      })
      .then(() => {
        if (route.params.entregador == false) {
          navigation.navigate('login', { visible: true });
        } else {
          navigation.navigate('veiculo', { id_Pessoa: idPessoa });
        }
      });
  };

  const buscarCep = (cep) => {
    setIsVisible(true);
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        setCep(response.data.cep);
        setLogadouro(response.data.logradouro);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setEstado(response.data.uf);
        setIsVisible(false);
      })
      .catch((error) => {
        console.log('error');
        setIsVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          {isVisible === true ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <Title>Cadastrar endereço</Title>
              <Text style={styles.label}>CEP</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                placeholder= "ex: 12345000"
                theme={inputTheme}
                value={cep}
                onBlur={() => buscarCep(cep)}
                onChangeText={setCep}
              />
              <Text style={styles.label}>Logradouro</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                theme={inputTheme}
                value={logadouro}
                onChangeText={setLogadouro}
              />
              <Text style={styles.label}>Número</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                theme={inputTheme}
                value={numero}
                onChangeText={setNumero}
              />
              <Text style={styles.label}>Bairro</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                theme={inputTheme}
                value={bairro}
                onChangeText={setBairro}
              />
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                theme={inputTheme}
                value={cidade}
                onChangeText={setCidade}
              />
              <Text style={styles.label}>Estado</Text>
              <TextInput
                mode="outlined"
                outlineColor="#fbbc04"
                activeOutlineColor="#fbbc04"
                theme={inputTheme}
                value={estado}
                onChangeText={setEstado}
              />
              <View style={{ marginTop: 30 }}>
                <ButtonSecundary
                  name="Avançar"
                  color="#fbbc04"
                  label="white"
                  rota={salvar}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default createEndereco;

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
