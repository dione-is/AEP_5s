 import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logout from './views/logout';
import index from './views/index';
import createPedido from './views/createPedido';
import indexEntregador from './views/IndexEntregador';
import rota from './views/rota';
import pessoa from './views/createPessoa';
import endereco from './views/createEndereco';
import login from './views/login';
import veiculo from './views/createVeiculo';
import entregador from './views/createEntregador';

const Stack = createNativeStackNavigator();
const logo = require('./imagens/Logo.png');

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="logout"
          component={logout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="veiculo"
          component={veiculo}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="entregador"
          component={entregador}
          options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="login"
          component={login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createPessoa"
          component={pessoa}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="endereco"
          component={endereco}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="indexEntregador"
          component={indexEntregador}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="rota"
          component={rota}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="createPedido"
          component={createPedido}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="index"
          component={index}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
