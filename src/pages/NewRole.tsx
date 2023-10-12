import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, TextInput, Dimensions, Button, Alert } from 'react-native';
import roleService from '../services/role.service';

export default function NewRole() {
    const roleInittialState = {
        name: "",
        description: ""
    }

    const [role, setRole] = useState(roleInittialState)
    const navigation = useNavigation<any>();

    const onChangeInput = (value: string, key: string) => {
        setRole(prevState => ({
          ...prevState,
          [key]: value,
        }));
    }

    const handleCreateRole = () => {
        if (!role.name.trim() || !role.description.trim()){
            return Alert.alert("Preencha todos os campos corretamente")
        }

        try{
            roleService.create(role)
            Alert.alert("Role criada")
            navigation.goBack()
        } 
        catch(e){
            return Alert.alert("Erro ao criar role")
        }
    }


  return (
    <View style={styles.container}>
        <View style={styles.textInputContainer}>
            <Text style={styles.label}>Nome: </Text>
            <TextInput
                style={styles.input}
                value={role.name}
                 onChangeText={text => onChangeInput(text, 'name')}
            />
        </View>
        <View style={styles.textInputContainer}>
            <Text style={styles.label}>Descrição: </Text>
            <TextInput
                style={styles.input}
                value={role.description}
                 onChangeText={text => onChangeInput(text, 'description')}
            />
        </View>
        <View style={styles.button}>
            <Button title=' Salvar' onPress={handleCreateRole} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '70%',
        gap: 20
    },
    textInputContainer: {
        paddingHorizontal: 20, 
        alignItems: 'flex-start', 
        width: Dimensions.get('screen').width
    },
    label: {
        fontSize: 20 
    },
    input: {
        width: Dimensions.get('screen').width - 40, 
        height: 50, 
        borderWidth: 1
    },
    button: {
        padding: 20
    }
});