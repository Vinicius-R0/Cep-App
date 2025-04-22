import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';
import api from '../components/api'

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('CEP inválido', 'Digite um CEP com 8 dígitos.');
      return;
    }

    try {
      Keyboard.dismiss();
      const response = await api.get(`${cep}/json/`);
      const data = response.data

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(data);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o CEP.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Endereço por CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
        maxLength={8}
      />

      <TouchableOpacity style={styles.botao} onPress={buscarCep}>
        <Text style={styles.botaoTexto}>Buscar</Text>
      </TouchableOpacity>

      {endereco && (
        <View style={styles.resultado}>
          <Text style={styles.texto}>CEP: {endereco.cep}</Text>
          <Text style={styles.texto}>Rua: {endereco.logradouro}</Text>
          <Text style={styles.texto}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.texto}>Cidade: {endereco.localidade}</Text>
          <Text style={styles.texto}>Estado: {endereco.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 30,
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});
