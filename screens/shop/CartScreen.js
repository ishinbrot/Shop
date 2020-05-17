import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import Card from '../../components/UI/Card';
import * as OrderActions from '../../store/actions/orders';


const CartScreen = props => {
    const [isLoading, setisLoading] = useState(false);
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const dispatch = useDispatch();

    const sendOrderHandler = async () => {
        setisLoading(true);
        await dispatch(OrderActions.addOrder(cartItems, cartTotalAmount));
        setisLoading(false);
    }
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems.sort((a, b) => {
            a.productId > b.productId ? 1 : -1
        });
        return
    });

    return <View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>Total:
            <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
            </Text>
            {isLoading ? <ActivityIndicator size="small" color={Colors.primary} /> :
                <Button title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler} />
            }
        </Card>
        <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData => <CartItem quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => { dispatch(removeFromCart(itemData.item.productId)) }} />} />
    </View>

};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}
const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
});


export default CartScreen;