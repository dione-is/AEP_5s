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
import { Button, Title, Checkbox, TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import ButtonSecundary from '../components/ButtonSecundary';
import { MaskedTextInput } from 'react-native-mask-text';
import { baseUrl } from './url';
import axios from 'axios';

function createVeiculo({ navigation, route }) {
  const [placa, setPlaca] = React.useState();
  const [alimenticio, setAlimenticio] = React.useState();
  const [modelo, setModelo] = React.useState();
  const [tipo, setTipo] = React.useState();
  const [checked, setChecked] = React.useState();
  const countries = ['Bicicleta', 'Caminhão', 'Carro', 'Moto', 'Pickup', 'Van'];
  const [idPessoa, setIdPessoa] = React.useState(route.params?.id_Pessoa);

  const salvar = () => {
    axios
      .post(`${baseUrl}/veiculo`, {
        placa,
        alimenticio: checked,
        modelo,
        tipoVeiculo: tipo,
      })
      .then((response) => {
        navigation.navigate('entregador', {
          idPessoa: idPessoa,
          idVeiculo: response.data._id,
        });
      })
      .catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          <Title style={{ textAlign: 'center', marginTop: 20 }}>
            Cadastro Veículo
          </Title>
          <Text>Placa</Text>
          <TextInput
            mode="outlined"
            outlineColor="#fbbc04"
            activeOutlineColor="#fbbc04"
            theme={inputTheme}
            value={placa}
            onChangeText={setPlaca}
          />
          <View style={{ marginTop: 20 }}>
            <SelectDropdown
              defaultButtonText="Tipo Veículo"
              data={countries}
              onSelect={(selecionado, index) => {}}
              buttonTextAfterSelection={(selecionado, index) => {
                setTipo(selecionado);
                return selecionado;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
          <Text style={{ marginTop: 15 }}>Modelo</Text>
          <TextInput
            mode="outlined"
            outlineColor="#fbbc04"
            activeOutlineColor="#fbbc04"
            theme={inputTheme}
            value={modelo}
            onChangeText={setModelo}
          />
          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color="#fbbc04"
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
              Possui Bag Térmica?
            </Text>
          </View>
          <View style={{ marginTop: 200 }}>
            <ButtonSecundary
              name="Avançar"
              color="#fbbc04"
              label="white"
              rota={salvar}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default createVeiculo;

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
});
