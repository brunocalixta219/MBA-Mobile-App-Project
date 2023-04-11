import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {

    const navigation = useNavigation<any>();

    navigation.setOptions({
        headerLeft: () => <Button title="Sair" onPress={() => navigation.goBack() } />,
        headerRight: () => <Button title="Add" onPress={() => navigation.navigate('UserPage') } />
    });

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
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
