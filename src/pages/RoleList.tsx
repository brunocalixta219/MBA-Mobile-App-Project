import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    SafeAreaView,
} from 'react-native'
import roleService from '../services/role.service'
import { Role } from '../dto/role'

export default function RoleList() {
    const [roleList, setRoleList] = React.useState<Role[]>([])

    const navigation = useNavigation<any>()

    function fetchRoleList() {
        roleService
            .getList()
            .then((list) => setRoleList(list))
            .catch((error) => navigation.goBack())
    }

    React.useEffect(() => fetchRoleList(), [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.listTitle}>Lista de Roles</Text>
            <View style={styles.item}>
                <Text style={styles.listTitleName}>Role</Text>
                <Text style={styles.listTitleDescription}>Descrição</Text>
            </View>
            <FlatList
                data={roleList}
                refreshing={false}
                onRefresh={fetchRoleList}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textDescription}>
                            {item.description}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
    },
    listTitle: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    listTitleName: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '30%',
        padding: 10,
    },
    listTitleDescription: {
        fontSize: 20,
        width: '70%',
        padding: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    item: {
        width: Dimensions.get('screen').width,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    textName: {
        fontSize: 20,
        width: '30%',
        padding: 10,
        justifyContent: 'center',
    },
    textDescription: {
        fontSize: 20,
        width: '70%',
        borderLeftWidth: 1,
        borderLeftColor: 'gray',
        paddingLeft: 20,
        padding: 10,
    },
    button: {
        padding: 20,
    },
})
