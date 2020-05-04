import React from 'react';
import { Platform } from 'react-native';
import { FlatList , Button, Alert} from 'react-native';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {productId: id });
};
const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete item?', [
        {text: 'No', style: 'default'},
        { text: 'Yes', style: 'destructive', onPress: () => { dispatch(deleteProduct(id))} }
    ])
};
    return <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData =>
            <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
               onSelect={()=>editProductHandler(itemData.item.id)}
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
        headerRight:  (
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


export default UserProductsScreen;