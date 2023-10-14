import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import userService from '../services/user.service';
import DropDownPicker from 'react-native-dropdown-picker';
import roleService from '../services/role.service';
import { Role } from '../dto/role';


export default function EditUser() {

    const [ id, setId ] = React.useState<number>();
    const [ name, setName ] = React.useState('');
    const [ username, setUsername ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ confirmPassword, setConfirmPassword ] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const [roles, setRoles] = React.useState(null);
    const [items, setItems] = React.useState([{}]);


    function fetchRoleList() {
        roleService
            .getList()
            .then((list) => {
                list.forEach(item => {
                    const newObj = {label:item.description, value:item.name}
                    setItems(items => [...items, newObj])
                });
            })
            .catch((error) => navigation.goBack())
    }


    const navigation = useNavigation<any>();
    const route = useRoute();

    function fetchUser() {
        if (route.params) {
            const { userId } = route.params as any;
            if (userId) {
                userService.get(userId).then(user => {
                    if (user) {
                        setId(user.id);
                        setName(user.name ? user.name : '');
                        setUsername(user.username);
                    }
                });
            }
        }
    }

    React.useEffect(() => fetchUser(), []);
    React.useEffect(() => fetchRoleList(), [])

    async function save() {
        if (!username || !username.trim()) {
            Alert.alert('O login é obrigatório!');
            return;
        }

        if (id) {
            userService.update({ id, name, username })
                .then(saved => navigation.goBack())
                .catch(error => Alert.alert(error));

        } else {
            if (!password || !password.trim()) {
                Alert.alert('A Senha é obrigatória!');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('As Senhas não conferem!');
                return;
            }

            userService.create({ username, name, password })
                .then(saved => navigation.goBack())
                .catch(error => Alert.alert(error));
        }
    }

   async function update(){
        const user = {
            id:id,
            name:name,
            username: username,
            roles: roles
        }
        userService.update(user)
        .then(saved => navigation.goBack())
        .catch(error => Alert.alert(error));
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

            <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                <Text style={{ fontSize: 20 }}>Nome: </Text>
                <TextInput
                    style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                    onChangeText={ value => setName(value) } value={name}
                />
            </View>

            <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width, zIndex:999 }}>

                <Text>Role</Text>
                <DropDownPicker
                    multiple={true}
                    min={0}
                    max={5}
                    style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width - 40, zIndex:999}}
                    open={open}
                    value={roles}
                    items={items.filter(item=> item.label != undefined)}
                    setOpen={setOpen}
                    setValue={setRoles}
                    setItems={setItems}
                />
            </View>

            { !id && ( <>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                    <Text style={{ fontSize: 20 }}>Senha: </Text>
                    <TextInput
                        style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                        onChangeText={ value => setPassword(value) } value={password}
                        secureTextEntry
                    />
                </View>
                <View style={{ paddingTop: 10, paddingHorizontal: 20, alignItems: 'flex-start', width: Dimensions.get('screen').width }}>
                    <Text style={{ fontSize: 20 }}>Confirmar Senha: </Text>
                    <TextInput
                        style={{ width: Dimensions.get('screen').width - 40, height: 50, borderWidth: 1 }}
                        onChangeText={ value => setConfirmPassword(value) } value={confirmPassword}
                        secureTextEntry
                    />
                </View>
                  <View style={{ padding: 20, zIndex:-1, marginTop:50 }}>
                    <Button title=' Salvar ' onPress={save} />
                </View>
            </> )}

            { id ?
              <View style={{ padding: 20, zIndex:-1, marginTop:50 }}>
                <Button title=' Atualizar ' onPress={update} />
              </View>
              : <></>
            }


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
