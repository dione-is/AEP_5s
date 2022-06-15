import React, { useEffect, useState } from 'react';
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
import { Button, Card, Title } from 'react-native-paper';
import { baseUrl } from './url';
import axios from 'axios';

const pacote = require('../imagens/pacote.png');
const alimento = require('../imagens/alimento.png');

function index({ navigation, route }) {
  const [pedidos, setPedidos] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(true);

  const getPedidos = () => {
    axios.get(`${baseUrl}/pedido`).then((response) => {
      setPedidos(response.data);
      setIsVisible(false);
    });
  };
  useEffect(() => {
    getPedidos();
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          {isVisible === true ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <Title style={styles.titulo}>Meus Pedidos</Title>
              <View style={styles.novoPedido}>
                <Title>+ Novo Pedido</Title>
                <View style={styles.card}>
                  <Card
                    onPress={() =>
                      navigation.navigate('createPedido', {
                        alimenticio: false,
                      })
                    }>
                    <Card.Content>
                      <Title style={{ marginLeft: 10, width: 80 }}>Pacote</Title>
                      <Image style={styles.imagemNovoPedido} source={pacote} />
                    </Card.Content>
                  </Card>
                  <Card
                    onPress={() =>
                      navigation.navigate('createPedido', { alimenticio: true })
                    }>
                    <Card.Content>
                      <Title style={{ marginLeft: 5 }}>Alimento</Title>
                      <Image
                        style={styles.imagemNovoPedido}
                        source={alimento}
                      />
                    </Card.Content>
                  </Card>
                </View>
              </View>
              <View style={styles.cardPedidosRecentes}>
                <Card>
                  <Title style={styles.subtitulo}>Pedidos recentes</Title>
                  {pedidos.map((element) => {
                    return (
                      <View style={styles.pedidos}>
                        {element.alimenticio == true ? (
                          <Image
                            style={styles.imagemPedidosRecentes}
                            source={alimento}
                          />
                        ) : (
                          <Image
                            style={styles.imagemPedidosRecentes}
                            source={pacote}
                          />
                        )}
                        <View>
                          <Text style={styles.labelPedidos}>
                            {element.nome}
                          </Text>
                          <Text style={styles.labelPedidos}>
                            {element.origem}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </Card>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default index;

const styles = StyleSheet.create({
  titulo: {
    marginLeft: 20,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 10,
  },

  subtitulo: {
    paddingTop: 10,
    fontSize: 16,
    marginLeft: 20,
  },

  fundoTela: {
    backgroundColor: 'white',
  },

  novoPedido: {
    backgroundColor: '#f2f2f2',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  card: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    borderRadius: 10,
  },

  cardPedidosRecentes: {
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  pedidos: {
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
    paddingBottom: 10,
  },

  imagemNovoPedido: {
    width: 50,
    height: 50,
    marginLeft: 25
  },

  labelPedidos: {
    fontSize: 14,
    marginLeft: 20,
  },

  imagemPedidosRecentes: {
    width: 40,
    height: 40,
  },
});
