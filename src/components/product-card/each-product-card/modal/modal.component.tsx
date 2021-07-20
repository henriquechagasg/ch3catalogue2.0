import React, { useState } from 'react'
import styles from './modal.module.scss';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { UseCart } from '../../../../context/cartContext';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io'
import 'react-toastify/dist/ReactToastify.css';



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

type ModalProps = {
    eachProduct: EachProduct,
    showModal: boolean,
    setShowModal: any;
}

export default function Modal({ eachProduct, showModal, setShowModal }: ModalProps){

        const { 
            addItemToCart,
            generatePhrase,
        } = UseCart()

        const [pSizeOrder, setPSizeOrder] = useState(0);
        const [mSizeOrder, setMSizeOrder] = useState(0);
        const [gSizeOrder, setGSizeOrder] = useState(0);
        const [ggSizeOrder, setGGSizeOrder] = useState(0);

        function closeModal() {
            setShowModal(prev => !prev)
        }

        function handleChildClick(e) {
            e.stopPropagation()
        }

        function addQuantityP() {

            if (pSizeOrder == eachProduct.avaiableP){
                toast.warn(generatePhrase(eachProduct.avaiableP), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (pSizeOrder <= eachProduct.avaiableP) {
                setPSizeOrder(pSizeOrder + 1)
            }
        }

        function addQuantityM() {
            if (mSizeOrder == eachProduct.avaiableM){
                toast.warn(generatePhrase(eachProduct.avaiableM), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (mSizeOrder <= eachProduct.avaiableM) {
                setMSizeOrder(mSizeOrder + 1)
            }
        }

        function addQuantityG() {
            if (gSizeOrder == eachProduct.avaiableG){
                toast.warn(generatePhrase(eachProduct.avaiableG), {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (gSizeOrder <= eachProduct.avaiableG) {
                setGSizeOrder(gSizeOrder + 1)
            }
        }

        function addQuantityGG() {
            if (ggSizeOrder == eachProduct.avaiableGG){
                toast.warn(generatePhrase(eachProduct.avaiableGG), {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (ggSizeOrder <= eachProduct.avaiableGG) {
                setGGSizeOrder(ggSizeOrder + 1)
            }
        }

        function removeQuantityP() {
            if (pSizeOrder > 0) {
                setPSizeOrder(pSizeOrder - 1)
            }
        }

        function removeQuantityM() {
            if (mSizeOrder > 0) {
                setMSizeOrder(mSizeOrder - 1)
            }
        }

        function removeQuantityG() {
            if (gSizeOrder > 0) {
                setGSizeOrder(gSizeOrder - 1)
            }
        }

        function removeQuantityGG() {
            if (ggSizeOrder > 0) {
                setGGSizeOrder(ggSizeOrder - 1)
            };
        }

        function eraseModalData() {
            setPSizeOrder(0);
            setMSizeOrder(0);
            setGSizeOrder(0);
            setGGSizeOrder(0);
        }

        function handleClickOutsideModal(){
            closeModal();
            eraseModalData();
        }

        function handleAddButtonClick() {
            const item = {
                ...eachProduct,
                pSizeOrder: pSizeOrder || 0,
                mSizeOrder: mSizeOrder || 0,
                gSizeOrder: gSizeOrder || 0,
                ggSizeOrder: ggSizeOrder || 0,
                totalOrdered: ((pSizeOrder || 0) + (mSizeOrder || 0) + (gSizeOrder || 0) + (ggSizeOrder || 0)),
                totalValueOrdered: (
                ((eachProduct.pSizePrice || eachProduct.mSizePrice || eachProduct.gSizePrice || 0) * 
                    ((pSizeOrder || 0) + (mSizeOrder || 0) + (gSizeOrder || 0))) + 
                ((eachProduct.ggSizePrice || 0) * (ggSizeOrder || 0))
                )
            }

            addItemToCart(item)
            eraseModalData()
        }

        return (
            <>
            {showModal ? (
                <div className={styles.container} onClick={handleClickOutsideModal}>
                    <div className={styles.modal} onClick={handleChildClick}>
                        <div className={styles.title}>
                            <span>Deseja adicionar <span className={styles.highReference}>{eachProduct.description} {eachProduct.color}</span> ao carrinho?</span>
                        </div>

                        { eachProduct.avaiableP > 0 ? (
                            <div className={styles.sizeToAdd}>
                                <span>TAMANHO P</span>
                                <div className={styles.selectQuantityButton}>
                                    <BiUpArrow className={styles.arrow} onClick={addQuantityP}/>
                                    <span>{pSizeOrder}</span>
                                    <BiDownArrow className={styles.arrow} onClick={removeQuantityP}/>
                                </div>
                            </div>
                        ): null}

                        { eachProduct.avaiableM > 0 ? (
                            <div className={styles.sizeToAdd}>
                                <span>TAMANHO M</span>
                                <div className={styles.selectQuantityButton}>
                                    <BiUpArrow className={styles.arrow} onClick={addQuantityM}/>
                                    <span>{mSizeOrder}</span>
                                    <BiDownArrow className={styles.arrow} onClick={removeQuantityM}/>
                                </div>
                            </div>
                        ): null}

                        { eachProduct.avaiableG > 0 ? (
                            <div className={styles.sizeToAdd}>
                                <span>TAMANHO G</span>
                                <div className={styles.selectQuantityButton}>
                                    <BiUpArrow className={styles.arrow} onClick={addQuantityG}/>
                                    <span>{gSizeOrder}</span>
                                    <BiDownArrow className={styles.arrow} onClick={removeQuantityG}/>
                                </div>
                            </div>
                        ): null}

                        { eachProduct.avaiableGG > 0 ? (
                            <div className={styles.sizeToAdd}>
                                <span>TAMANHO GG</span>
                                <div className={styles.selectQuantityButton}>
                                    <BiUpArrow className={styles.arrow} onClick={addQuantityGG}/>
                                    <span>{ggSizeOrder}</span>
                                    <BiDownArrow className={styles.arrow} onClick={removeQuantityGG}/>
                                </div>
                            </div>
                        ): null}

                            <div className={styles.modalBottom}>
                                <button onClick={handleAddButtonClick}>Adicionar</button>
                            </div>
                        <IoMdClose className={styles.closeIcon} onClick={handleClickOutsideModal}/>
                    </div>                    
                </div>
            ) : null}

           

            </>
        )
    
};
    