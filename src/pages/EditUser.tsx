import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EditUser() {

    const [ name, setName ] = React.useState('');
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ confirmPassword, setConfirmPassword ] = React.useState('');

    const navigation = useNavigation<any>();

    function save() {
        if (username && password === confirmPassword) {
            navigation.goBack();
        } else {
            Alert.alert('Login / senha inválido(a)!');
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Login: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setUsername(value) } value={username}
                />
            </View>

            <View style={{ paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Nome: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setName(value) } value={name}
                />
            </View>

            <View style={{ padding: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Senha: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setPassword(value) } value={password}
                    secureTextEntry
                />
            </View>
            <View style={{ padding: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Confirmar Senha: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setConfirmPassword(value) } value={confirmPassword}
                    secureTextEntry
                />
            </View>

            <View style={{ padding: 20 }}>
                <Button title=' Entrar ' onPress={save} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
