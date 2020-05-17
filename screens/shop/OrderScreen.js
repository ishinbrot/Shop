import React, { useEffect, useState, useCallback } from 'react';

import { View, FlatList, Text, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback(async ()=> {
        setError(null);
        setIsLoading(false);
        setIsRefreshing(true);
        try {
            await dispatch(ordersActions.fetchOrders());
        }
        catch (error) {
            setError(true);
        }
        finally {
            setIsRefreshing(false);
        }
    }, [dispatch, setIsLoading, setError ]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadOrders);

        return () => {
            willFocusSub.remove()
        }
    }, [loadOrders]);

    if (isLoading) {
        return <View style={StyleSheet.centered}>
            <ActivityIndicator size='large' color={Colors.primary} /></View>
    }
    if (error) {
        return <View style={styles.centered}>
            <Text>An error occured!</Text>
            <Button title="Try again"
                onPress={loadProducts}
                color={Colors.primary} />
        </View>
    }
    return <FlatList
        data={orders}
        onRefresh={loadOrders}
        refreshing={isRefreshing}
        keyExtractor={item => item.id}
        renderItem={itemData => <OrderItem amount={itemData.item.totalAmount}
            date={itemData.item.readableDate} items={itemData.item.items} />
        } />
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>)

    }


}
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;