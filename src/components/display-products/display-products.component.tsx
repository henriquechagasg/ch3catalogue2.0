import React from 'react';

import ProductCard from '../product-card/all-products-card/product-card.component';
import EachProductCard from '../product-card/each-product-card/each-product-card.components';
import { CartProduct } from '../cart-product/cart-product';

import styles from './display-products.module.scss';

type AllProduct = {
    id: string,
    refer: string,
    description: string,
    groupDescription: string,
    collection: string,
    avaiableP: number,
    avaiableM: number,
    avaiableG: number,
    aviableGG: number,
    images: string[],
    isAdded: boolean,
    pSizePrice: number,
    mSizePrice: number,
    gSizePrice: number,
    ggSizePrice: number,
  }

  type EachProduct ={
    id: string,
    refer: string,
    description: string,
    color: string,
    groupDescription: string,
    image: string,
    avaiableP: number,
    avaiableM: number,
    avaiableG: number,
    avaiableGG: number,
    pSizePrice: number,
    mSizePrice: number,
    gSizePrice: number,
    ggSizePrice: number, 
}

type cartItem = {
    id: string,
    refer: string,
    description: string,
    color: string,
    groupDescription: string,
    image: string,
    avaiableP: number,
    avaiableM: number,
    avaiableG: number,
    avaiableGG: number,
    pSizePrice: number,
    mSizePrice: number,
    gSizePrice: number,
    ggSizePrice: number, 
    pSizeOrder: number,
    mSizeOrder: number,
    gSizeOrder: number,
    ggSizeOrder: number,
    totalOrdered: number,
    totalValueOrdered: number
}
  
  type DisplayProductsProps = {
    allProducts?: AllProduct[],
    eachProduct?: EachProduct[],
    cartItems?: cartItem[]
  }

export function DisplayProducts({ allProducts, eachProduct, cartItems } : DisplayProductsProps){
    
    if (allProducts) {
        return (
            <div className={styles.container}>
                { allProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )
    } else if (eachProduct) {
        return(
            <div className={styles.container}>
                { eachProduct.map(product => (
                    <EachProductCard key={product.id} eachProduct={product} />
                ))}
            </div>
        )
    } else if (cartItems) {
        return (
            <div className={styles.container}>
                { cartItems.map(cartItem => (
                    <CartProduct key={cartItem.id} cartItem={cartItem}/>
                ))}
            </div>
        )
    } else {
        return null
    }
}