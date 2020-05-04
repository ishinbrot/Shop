import React from 'react';

import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    return <View style={styles.cartItem}>
        <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity}</Text>
            <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.itemData}>
            <Text style={styles.amount}>${props.amount.toFixed()}</Text>
            {props.deletetable && (
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.os === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red' />
                </TouchableOpacity>
            )}
        </View>
    </View>
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    },
});


export default CartItem;