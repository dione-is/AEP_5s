import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Button, Card, Title, List, TextInput } from 'react-native-paper';
import { baseUrl } from './url';
import axios from 'axios';

const mapa = require('../imagens/mapa.png');

function rota({ navigation, route }) {
  const [pedido, setPedido] = React.useState(route.params?.pedido);
  const [idPedido, setIdPedido] = React.useState(route.params?.pedido_id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          <Image
            source={mapa}
            style={{ width: 380, height: 350, marginLeft: 15 }}
          />
          <Text style={styles.infoEntrega}>Informações de entrega</Text>
          <View style={styles.localizacao}>
            <Text style={{marginTop: 10}}>Origem</Text>
            <TextInput
              mode="outlined"
              disabled={true}
              value={pedido.origem}></TextInput>
            <Text style={{marginTop: 10}}>Destino</Text>
            <TextInput
              mode="outlined"
              disabled={true}
              value={pedido.destino}></TextInput>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default rota;

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

  infoEntrega: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },

  localizacao: {
    padding: 20,
  },
});
