import qs from 'qs';
import styles from './closeOrder-modal.module.scss';
import getConfig from 'next/config';
import axios from 'axios'

import { useState } from 'react';
import { IoMdClose } from 'react-icons/io'
import { Spinner } from '../with-spinner/with-spinner.component';
import { UseCart } from '../../context/cartContext';



export function CloseOrderModal({cartValue, cartTotal, setShowModal}) {

    const [clientName, setClientName] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [isSendingOrder, setIsSendingOrder] = useState(false);

    const { 
        cartItems, 
        setCartItems,
        setOrderSucceed,
        setOrderFailed } = UseCart()

    const { publicRuntimeConfig } = getConfig()
    const { backendUrl, sendMailAdress, API_KEY } = publicRuntimeConfig


    function closeModal() {
        setShowModal(false)
    }

    function handleChildClick(e) {
        e.stopPropagation()
    }

    function cellPhoneMask(number){
        let text = number
        text = text.replace(/\-/g, '');
        text = text.replace(/\s/g, '');
        text = text.replace(/\(/g, '');
        text = text.replace(/\)/g, '');
        text = text.replace(/[A-Za-z]/g, '')
        if (text[0] === "0"){
            text = text.replace("0", "")
        }
        let fixedText;
        if (text.length === 10) {
            const ddd = text.slice(0,2);
            const part1 = text.slice(2,6)
            const part2 = text.slice(6,10)
            fixedText = `(${ddd}) 9${part1}-${part2}`
        } else if(text.length === 11){
            const ddd = text.slice(0,2);
            const part1 = text.slice(2,7)
            const part2 = text.slice(7,11)
            fixedText = `(${ddd}) ${part1}-${part2}`
        }

        if (fixedText) {
            setClientPhone(fixedText)
        } else {
            setClientPhone(number)
        }
    }

    async function sendMail() {
        const data = {
            to: "ch3moda@gmail.com",
            subject: "NOVO PEDIDO CATALOGO ON",
            text: `
Você recebeu um novo pedido de ${clientName}.
Entre em https://catalogoch3.store/orders e confira.
`,
            API_KEY,
        }
        axios({
            method: "post",
            url: `${sendMailAdress}/sendMail`,
            data: qs.stringify(data),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
         .then(response => {
             console.log("Mensagem enviada com sucesso")
         })
         .catch(error => {
             console.log(error)
         })
    }

    async function sendOrder(){
        const data = {
            name: clientName,
            phone: clientPhone,
            email: clientEmail,
            clientOrder: cartItems,
         }
         console.log(data)
         setIsSendingOrder(true);
         axios({
             method: 'post',
             url: `${backendUrl}/neworder`,
             data: qs.stringify(data),
             headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }})
            .then(response => {
                sendMail()
                setOrderSucceed(true);
                setIsSendingOrder(false)
                setCartItems([]);
            })
            .catch(error => {
                setOrderFailed(true)
                setIsSendingOrder(false);
            }) 
    }

    return (
        <div className={styles.container} onClick={closeModal}>
            <div className={styles.modal} onClick={handleChildClick}>
                {isSendingOrder ? (
                    <>
                    <span>Aguarde enquanto enviamos...</span>
                    <Spinner />
                    </>
                ): (
                    <>
                    <span>Total de Peças: <b>{cartValue}</b></span>
                    <span>Valor Total: R$ <b>{cartTotal.toFixed(2)}</b></span>
                    <input 
                    type="text" 
                    placeholder="Nome" 
                    required 
                    onChange={(e) => setClientName(e.target.value)}/>
                    <input 
                    type="text" 
                    placeholder="Telefone(DDD + 99999-9999)" 
                    required 
                    onChange={(e) => cellPhoneMask(e.target.value)}
                    onBlur={(e) => e.target.value = clientPhone}/>
                    <input 
                    type="email" 
                    placeholder="E-mail" 
                    required
                    onChange={(e) => setClientEmail(e.target.value)}/>
                    <div>
                        <button onClick={() => sendOrder()}>Enviar Pedido</button>
                    </div>
    
                    <IoMdClose className={styles.closeIcon} onClick={closeModal}/>
                    </>
                )}


            </div>
        </div>
    )
}