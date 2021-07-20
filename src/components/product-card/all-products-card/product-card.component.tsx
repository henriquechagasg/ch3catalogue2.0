import React from 'react';
import Link from 'next/link';

import ImageSlider from '../image-slider/image-slider.component';

import styles from './product-card.module.scss'

type Product = {
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

type ProductCardProps = {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {

    function renderProductPrice() {
        if (product.pSizePrice) {
            if (product.ggSizePrice) {
                return (<span><b>P M G:</b> R$ {product.pSizePrice}0 / <b>GG:</b> {product.ggSizePrice}0</span>)
            } else {
                return (<span><b>P M G:</b> R$ {product.pSizePrice}0</span>)
            }
        } else if (product.mSizePrice){
            if (product.ggSizePrice) {
                return (<span><b>P M G:</b> {product.mSizePrice} / <b>GG:</b> {product.ggSizePrice}</span>)
            } else {
                return (<span><b>P M G:</b> {product.mSizePrice}</span>)
            }
        } else if (product.gSizePrice){
            if (product.ggSizePrice) {
                return (<span><b>P M G:</b> {product.gSizePrice} / <b>GG:</b> {product.ggSizePrice}</span>)
            } else {
                return (<span><b>P M G:</b> {product.gSizePrice}</span>)
            }
        } 
    }

    return (
    <div className={styles.allProductsCard}>
        <div className={styles.image}>
            <ImageSlider slides={product.images}/>
        </div>
        <div className={styles.cardFooter}>
            <span><b>Referência: {product.refer}</b></span>
            <div className={styles.productTitleContainer}>
                <span>{product.description}</span>
            </div>
            {renderProductPrice()}
            <div className={styles.footerButtonsContainer}>
                <Link 
                href={`/${product.refer}`}
                prefetch={false}>
                <button>Ver Disponíveis</button>
                </Link>
            </div>
        </div>
    </div>)
}

export default ProductCard;