import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Button, Title, TextInput } from 'react-native-paper';
import Buttonsecundary from '../components/ButtonSecundary';
import { MaskedTextInput } from 'react-native-mask-text';
import { baseUrl } from './url';
import axios from 'axios';

const bike = require('../imagens/bike.png');
const caminhao = require('../imagens/caminhao.png');
const carro = require('../imagens/carro.png');
const moto = require('../imagens/moto.png');
const pickup = require('../imagens/pickup.png');
const van = require('../imagens/van.png');

function create({ navigation, route }) {
  const [origem, setOrigem] = React.useState('');
  const [destino, setDestino] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [conteudo, setConteudo] = React.useState('');
  const [veiculo, setVeiculo] = React.useState();

  const salvar = () => {
    axios
      .post(`${baseUrl}/pedido`, {
        origem,
        destino,
        nome,
        telefone,
        conteudo,
        alimenticio: route.params?.alimenticio,
        status: 'pendente',
        veiculo,
      })
      .then((response) => {
        navigation.navigate('index', { novoPedido: conteudo });
      })
      .catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          <Title>Cadastrar informações</Title>
          <View style={{ marginTop: 15 }}>
            <Text>Origem</Text>
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              value={origem}
              onChangeText={setOrigem}
              placeholder="Ex: Avenida Brasil, 101"
            />
            <Text>Destino</Text>
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              value={destino}
              onChangeText={setDestino}
              placeholder="Ex: Rua de baixo, 13"
            />
            <Text>Nome do Destinatário</Text>
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              value={nome}
              onChangeText={setNome}
            />
            <Text>Telefone do Destinatário</Text>
            <MaskedTextInput
              mask="(99)99999-9999"
              value={telefone}
              onChangeText={(telefone, rawTelefone) => {
                setTelefone(rawTelefone);
              }}
              style={styles.input}
            />
            <Text>Declaração de Conteúdo</Text>
            <TextInput
              mode="outlined"
              outlineColor="#fbbc04"
              activeOutlineColor="#fbbc04"
              theme={inputTheme}
              value={conteudo}
              onChangeText={setConteudo}
              placeholder="Ex: Tênis Nike Air Max"
            />
            <Title style={{ marginTop: 15 }}>Veículo</Title>
            <TextInput
              placeholder="selecione um veículo"
              mode="outlined"
              disabled={true}
              value={veiculo}></TextInput>
            <View style={styles.veiculos}>
              <TouchableOpacity onPress={() => setVeiculo('Bicicleta')}>
                <Image source={bike} style={styles.img} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVeiculo('Moto')}>
                <Image source={moto} style={styles.img} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVeiculo('Carro')}>
                <Image source={carro} style={styles.img} />
              </TouchableOpacity>
            </View>
            <View style={styles.veiculos}>
              <TouchableOpacity onPress={() => setVeiculo('Pickup')}>
                <Image source={pickup} style={styles.img} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVeiculo('Van')}>
                <Image source={van} style={styles.img} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVeiculo('Caminhão')}>
                <Image source={caminhao} style={styles.img} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Buttonsecundary
              name="Confirmar"
              rota={salvar}
              label="white"
              color="#fbbc04"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default create;

const inputTheme = {
  colors: { primary: '#fbbc04', text: 'black' },
};

const styles = StyleSheet.create({
  fundoTela: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 50
  },

  input: {
    height: 50,
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  veiculos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  img: {
    height: 50,
    width: 50
  }
});
