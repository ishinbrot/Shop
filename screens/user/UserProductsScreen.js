import React, { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import {View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { deleteProduct, fetchProducts } from '../../store/actions/products';

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(false);
        setIsRefreshing(true);
        try {
            await dispatch(fetchProducts());
        }
        catch (error) {
            setError(true);
        }
        finally {
            setIsRefreshing(false);
        }

    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);

        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts]);
    const deleteHandler = (id) => {
        try {
            Alert.alert('Are you sure?', 'Do you want to delete item?', [
                { text: 'No', style: 'default' },
                { text: 'Yes', style: 'destructive', onPress: () => { 
                   try {
                    dispatch(deleteProduct(id))
                   }
                   catch (error) {
                    Alert.alert('An error occured!', "Object not", [{text: 'Okay' }]);
                    setError(true);
                   } 
                } }
            ])
        }
        catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
     
    }, [dispatch, loadProducts]);
    if (error) {
        return <View style={styles.centered}>
            <Text>An error occured!</Text>
            <Button title="Try again"
                onPress={loadProducts}
                color={Colors.primary} />
        </View>
    }
    
    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    }
    if (!isLoading  && userProducts.length === 0) {
        return <View style={styles.centered}>
            <Text>No products found. Try adding some</Text>
        </View>
    }
    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => editProductHandler(itemData.item.id)}
            >
                <Button color={Colors.primary} title="Edit" onPress={() => editProductHandler(itemData.item.id)} />
                <Button color={Colors.primary} title="Delete" onPress={() => {
                    deleteHandler(itemData.item.id);
                }} /></ProductItem>} />
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct');
                    }} />
            </HeaderButtons>
        ),

    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default UserProductsScreen;