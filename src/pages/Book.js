import React,{useState} from 'react';
import {SafeAreaView,Alert,View,StyleSheet,AsyncStorage,TouchableOpacity,TextInput,Text} from 'react-native';
import axios from 'axios';
import baseUrl from '../services/api';
export default function Book({navigation}){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');
   async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await axios.post(baseUrl+`/spots/${id}/bookings`,{
            date
        },{
            headers:{user_id}
        })
        Alert.alert('Solicitação enviada!');
        navigation.navigate('List');
    }
    function handleCancel(){
        navigation.navigate('List');
    }
    return (<SafeAreaView style={styles.container}>
        <Text style={styles.label}>Date de interesse*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data vc quer reservar?"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                 <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>
                      Solicitar reserva
                    </Text></TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                    <Text style={styles.buttonText}>
                        Cancelar
                    </Text></TouchableOpacity>

        </SafeAreaView>);
}
const styles = StyleSheet.create({
 
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop:30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        
    },
    cancelButton:{
      
        backgroundColor: '#ccc',
      
      
    },
    container:{
        margin: 30,
       
    }
});