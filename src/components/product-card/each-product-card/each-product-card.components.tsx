import React, { useState } from 'react';


import AvaiableSizes from './avaiable-size-card/avaiable-size-card.component'
import Modal from './modal/modal.component';
import { FaCartPlus } from 'react-icons/fa';

import styles from './each-product.module.scss';

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

type EachProductCardProps = {
    eachProduct: EachProduct,
}

const EachProductCard = ({ eachProduct }: EachProductCardProps) => {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(prev => !prev);
    }

    const productTotals = (
        (eachProduct.avaiableP || 0) + (eachProduct.avaiableM || 0) + 
        (eachProduct.avaiableG || 0) + (eachProduct.avaiableGG || 0)
        )

    function renderProductPrice() {
        if (eachProduct.pSizePrice) {
            if (eachProduct.ggSizePrice) {
                return (<span><b>P M G:</b> R$ {eachProduct.pSizePrice}0 / <b>GG:</b> {eachProduct.ggSizePrice}0</span>)
            } else {
                return (<span><b>P M G:</b> R$ {eachProduct.pSizePrice}0</span>)
            }
        } else if (eachProduct.mSizePrice){
            if (eachProduct.ggSizePrice) {
                return (<span><b>P M G:</b> {eachProduct.mSizePrice} / <b>GG:</b> {eachProduct.ggSizePrice}</span>)
            } else {
                return (<span><b>P M G:</b> {eachProduct.mSizePrice}</span>)
            }
        } else if (eachProduct.gSizePrice){
            if (eachProduct.ggSizePrice) {
                return (<span><b>P M G:</b> {eachProduct.gSizePrice} / <b>GG:</b> {eachProduct.ggSizePrice}</span>)
            } else {
                return (<span><b>P M G:</b> {eachProduct.gSizePrice}</span>)
            }
        } 
    }

    if (productTotals > 0) {
        return (
            <div>
                    <div className={styles.eachProductCard} >
                        <div className={styles.image}>
                            <img src={eachProduct.image} alt=""/>
                        </div>
                        <div className={styles.cardFooter}>
                            {/* <span><b>Referencia {eachProduct.refer}</b></span> */}
                            <div className={styles.productTitleContainer}>
                                <span>{eachProduct.description}</span>
                            </div>
                            <span>{eachProduct.color}</span>
                            { renderProductPrice() }
                            <span>Tamanhos Disponiveis</span>
                            <div className={styles.footerButtonsContainer}>
                                <AvaiableSizes quantity={eachProduct.avaiableP} size="P"/>
                                <AvaiableSizes quantity={eachProduct.avaiableM} size="M"/>
                                <AvaiableSizes quantity={eachProduct.avaiableG} size="G"/>
                                <AvaiableSizes quantity={eachProduct.avaiableGG} size="GG"/>
                            </div>
                        </div>

                        <div className={styles.iconContainer} onClick={toggleModal}>
                            <FaCartPlus className={styles.cartPlusIcon}/>
                        </div>
                    </div>
                    
                <Modal eachProduct={eachProduct} showModal={showModal} setShowModal={setShowModal}/>
                
            </div>

        )
    } else {
        return null
    }
    
}

export default EachProductCard;