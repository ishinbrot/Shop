import React from 'react';

import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrderScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductsScreen';
import { Ionicons } from '@expo/vector-icons';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};
const ProductsNavigator = createStackNavigator({
    ProductsOverviewScreen: ProductsOverviewScreen,
    ProductDetail: ProductDetailsScreen,
    Cart: CartScreen,
    orderScreen: OrdersScreen

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions:
        defaultNavOptions

}
);


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions:
            defaultNavOptions


    });

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor} />
        },
        defaultNavigationOptions:
            defaultNavOptions


    });

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},

    {
        contentOptions: {
            activeTintColor: Colors.primary,
        }
    })

export default createAppContainer(ShopNavigator);