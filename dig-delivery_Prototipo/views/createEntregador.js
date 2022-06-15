import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Card, Title, TextInput } from 'react-native-paper';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecundary from '../components/ButtonSecundary';
import { MaskedTextInput } from 'react-native-mask-text';
import { baseUrl } from './url';
import axios from 'axios';

function createEntregador({ navigation, route }) {
  const [numeroCartao, setNumeroCartao] = React.useState();
  const [maskNumeroCartao, setMaskNumeroCartao] = React.useState();
  const [nomeTitular, setNomeTitular] = React.useState();
  const [validade, setValidade] = React.useState();
  const [maskValidade, setMaskValidade] = React.useState();
  const [cvc, setCvc] = React.useState();
  const [cpf, setCpf] = React.useState();
  const [numeroConta, setNumeroConta] = React.useState();
  const [numeroAgencia, setNumeroAgencia] = React.useState();
  const chip = require('../imagens/chip.png');
  const masterCard = require('../imagens/mastercard.jpg');

  const salvar = () => {
    axios
      .post(`${baseUrl}/entregador`, {
        numeroCartao,
        nomeTitular,
        validade,
        cvc,
        cpf,
        numeroConta,
        numeroAgencia,
        id_pessoa: route.params?.idPessoa,
        id_veiculo: route.params?.idVeiculo,
      })
      .then((response) => {
        navigation.navigate('login', {visible: true});
      })
      .catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.fundoTela}>
            <Title style={{paddingLeft: 15}}>Cadastro Dados Bancários</Title>
            <Card style={styles.card}>
              <Card.Content>
                <Image style={{ width: 50, height: 50 }} source={chip} />

                <TextInput
                  style={{ width: 300, backgroundColor: 'black', fontSize: 25 }}
                  value={maskNumeroCartao}
                  theme={inputThemeBlack}
                  placeholder="0000 0000 0000 0000"></TextInput>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginLeft: 100,
                  }}>
                  <Text style={styles.text}>Valido até</Text>
                  <TextInput
                    style={{ width: 70, backgroundColor: 'black' }}
                    placeholder="**/**"
                    value={maskValidade}
                    theme={inputThemeBlack}></TextInput>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    style={{ width: 200, backgroundColor: 'black' }}
                    value={nomeTitular}
                    theme={inputThemeBlack}
                    placeholder="NOME TITULAR CARTAO"></TextInput>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={masterCard}
                  />
                </View>
              </Card.Content>
            </Card>
            <View>
              <View style={{ marginBottom: 5, marginRight: 20 }}>
                <Text style={{ marginLeft: 20 }}>Numero Cartão</Text>
                <MaskedTextInput
                  mask="9999 9999 9999 9999"
                  value={numeroCartao}
                  onChangeText={(maskNumeroCartao, rawNumeroCartao) => {
                    setNumeroCartao(rawNumeroCartao);
                    setMaskNumeroCartao(maskNumeroCartao);
                  }}
                  style={styles.input}
                />
              </View>
              <View style={styles.flex}>
                <Text style={{ marginLeft: 20 }}>Nome Titular</Text>
                <Text style={{ marginLeft: 180 }}>Validade</Text>
              </View>
              <View style={styles.flex}>
                <TextInput
                  value={nomeTitular}
                  onChangeText={setNomeTitular}
                  style={{ width: 250, marginLeft: 20 }}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  dense={false}
                  theme={inputTheme}></TextInput>
                <MaskedTextInput
                  mask="99/99"
                  value={validade}
                  onChangeText={(maskValidade, rawValidade) => {
                    setValidade(rawValidade);
                    setMaskValidade(maskValidade);
                  }}
                  style={{
                    width: 110,
                    height: 60,
                    borderWidth: 2,
                    borderRadius: 5,
                    marginLeft: 10,
                    marginTop: 5,
                  }}
                />
              </View>
              <View style={styles.flex}>
                <Text style={{ marginLeft: 20 }}>CPF</Text>
                <Text style={{ marginLeft: 200 }}>CVC</Text>
              </View>
              <View style={styles.flex}>
                <MaskedTextInput
                  mask="999.999.999-99"
                  value={cpf}
                  onChangeText={(cpf, rawCpf) => {
                    setCpf(rawCpf);
                  }}
                  style={{
                    width: 210,
                    height: 60,
                    borderWidth: 2,
                    borderRadius: 5,
                    marginLeft: 20,
                    marginTop: 5,
                  }}
                />
                <TextInput
                  value={cvc}
                  onChangeText={setCvc}
                  style={{ width: 150, marginLeft: 10 }}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="back"
                  theme={inputTheme}></TextInput>
              </View>
              <View style={styles.flex}>
                <Text style={{ marginLeft: 25 }}>Agencia</Text>
                <Text style={{ marginLeft: 80 }}>Conta</Text>
              </View>
              <View style={styles.flex}>
                <TextInput
                  value={numeroAgencia}
                  onChangeText={setNumeroAgencia}
                  style={{ width: 130, marginLeft: 20 }}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  theme={inputTheme}></TextInput>
                <TextInput
                  value={numeroConta}
                  onChangeText={setNumeroConta}
                  style={{ width: 180, marginLeft: 10 }}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  theme={inputTheme}></TextInput>
              </View>
              <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <ButtonSecundary
                  name="Salvar"
                  color="#fbbc04"
                  label="black"
                  rota={salvar}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default createEntregador;

const inputTheme = {
  colors: { primary: 'black', text: 'black', placeholder: '#878687' },
};

const inputThemeBlack = {
  colors: { primary: 'black', text: '#878687', placeholder: '#878687' },
};

const styles = StyleSheet.create({
  fundoTela: {
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 10,
  },

  card: {
    backgroundColor: 'black',
    paddingVertical: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  text: {
    color: '#878687',
    fontSize: 15,
    marginTop: 20,
  },

  flex: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  input: {
    color: 'black',
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 20,
  },
});
