import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import EditUser from './src/pages/EditUser';
import NewRole from './src/pages/NewRole';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Acesso" component={LoginPage} />
                <Stack.Screen name="Home" component={HomePage} options={{ title: 'Auth App' }} />
                <Stack.Screen name="EditUser" component={EditUser} />
                <Stack.Screen name="NewRole" component={NewRole} options={{ title: 'Cadastrar Role' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}