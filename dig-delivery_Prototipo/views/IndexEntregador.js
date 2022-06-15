import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Button, Card, Title, List, TextInput } from 'react-native-paper';
import { baseUrl } from './url';
import axios from 'axios';

const pacote = require('../imagens/pacote.png');
const alimento = require('../imagens/alimento.png');

function IndexEntregador({ navigation, route }) {
  const [pedidos, setPedidos] = React.useState([]);
  const [confirmado, setConfirmado] = React.useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const confirmarPedido = (idPedido) => {
    axios.get(`${baseUrl}/pedido/${idPedido}`).then((response) => {
      axios.put(`${baseUrl}/pedido/${idPedido}`, {
        origem: response.data.origem,
        destino: response.data.destino,
        nome: response.data.nome,
        telefone: response.data.telefone,
        conteudo: response.data.conteudo,
        alimenticio: response.data.alimenticio,
        status: 'em andamento',
      });
      setConfirmado(confirmado + 1);
      navigation.navigate('rota', { pedido: response.data });
    });
  };

  const recusadoPedido = (idPedido) => {
    setIsVisible(true);
    axios.get(`${baseUrl}/pedido/${idPedido}`).then((response) => {
      axios.put(`${baseUrl}/pedido/${idPedido}`, {
        origem: response.data.origem,
        destino: response.data.destino,
        nome: response.data.nome,
        telefone: response.data.telefone,
        conteudo: response.data.conteudo,
        alimenticio: response.data.alimenticio,
        status: 'recusado',
      });
    });
    getPedidos();
  };
  const getPedidos = () => {
    axios.get(`${baseUrl}/pedido`).then((response) => {
      setPedidos(response.data);
      setIsVisible(false);
    });
  };
  useEffect(() => {
    getPedidos();
  }, [route, confirmado]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fundoTela}>
          {isVisible === true ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
          <Title>Entregas Atuais</Title>
          <View style={styles.entregasAtuais}>
            {pedidos
              .filter((element) => element.status === 'em andamento')
              .map((elementFilter) => {
                return (
                  <View style={styles.pedidos}>
                    {elementFilter.alimenticio == true ? (
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
                        {elementFilter.nome}
                      </Text>
                      <Text style={styles.labelPedidos}>
                        {elementFilter.origem}
                      </Text>
                      <Text style={styles.labelPedidos}>
                        {elementFilter.destino}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <Title style={{ marginTop: 10 }}>Solicitações de entregas</Title>
          <View style={styles.novasEntregas}>
            {pedidos
              .filter((element) => element.status === 'pendente')
              .map((elementFilter) => {
                return (
                  <View style={{padding: 10}}>
                    <View style={{ flexDirection: 'row' }}>
                      {elementFilter.alimenticio == true ? (
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
                      <View style={styles.legendaEntrega}>
                        <Text>{elementFilter.origem}</Text>
                        <Text>{elementFilter.destino}</Text>
                      </View>
                    </View>
                    <Text style={styles.detalhes}>Ver detalhes ...</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        marginBottom: 10,
                      }}>
                      <Button
                        mode="contained"
                        style={{ backgroundColor: 'red', borderRadius: 10, width: '45%' }}
                        onPress={() => recusadoPedido(elementFilter._id)}>
                        Recusar
                      </Button>
                      <Button
                        mode="contained" // depois de importa butt sera padrao raidus etc
                        style={{
                          backgroundColor: 'green',
                          marginLeft: 20,
                          borderRadius: 10, width: '45%' 
                        }}
                        onPress={() => confirmarPedido(elementFilter._id)}>
                        Aceitar
                      </Button>
                    </View>
                  </View>
                );
              })}
          </View>
          </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default IndexEntregador;

const styles = StyleSheet.create({
  fundoTela: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    paddingTop: 10,
  },

  entregasAtuais: {
    paddingBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingTop: 10,
  },

  novasEntregas: {
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
    paddingBottom: 10,
    borderRadius: 10,
    paddingTop: 10,
  },

  imagemPedidosRecentes: {
    width: 45,
    height: 45,
    marginRight: 5
  },

  labelPedidos: {
    fontSize: 14,
    marginLeft: 20,
    color: 'black',
  },

  pedidos: {
    marginTop: 10,
    marginLeft: 15,
    flexDirection: 'row',
    paddingBottom: 10,
  },

  legendaEntrega: {
    fontWeight: 'bold',
    marginLeft: 5,
  },

  detalhes: {
    color: '#fbbc04',
    marginTop: 15,
    fontWeight: 'bold',
  },
});
