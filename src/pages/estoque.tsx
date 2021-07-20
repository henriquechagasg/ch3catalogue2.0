import React, { useEffect, useState } from 'react';
import lowerCaseSentence from '../utils/sentenceToLowerCase';
import styles from '../styles/Stock.module.scss'

import { api } from "../utils/apiService"
import { GetStaticProps } from 'next';
import { StockProduct } from '../components/stock-product/stock-product';
import { UseUser } from '../context/userContext';

export function InStockProducts({ inStockProducts }){

  const [searchReference, setSearchReference] = useState('')
  const [productsToShow, setProductsToShow] = useState([])

  const { currentUser } = UseUser()

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (window && !user) {
        window.location.href = "/login"
    }
  }, [])
  
  useEffect(() => {
    if (!searchReference){
      setProductsToShow([...inStockProducts])
      return
    }
    setProductsToShow(inStockProducts.filter(stockItem => {
      return stockItem.refer.includes(searchReference)
    }))
    
  }, [searchReference])

  return (
    <>
    <div className={styles.inputContainer}>
      <input 
      className={styles.searchInput}
      type="text"  
      onChange={(e) => setSearchReference(e.target.value)}
      placeholder="Referência"
      />
    </div> 
    <div className={styles.container}>
      {productsToShow.map(stockitem => {
          return (
            <StockProduct key={stockitem._id} stockItem={stockitem} />
          )
      })}
    </div>
    </>
  )

}



export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/stock');
  const inStockProducts = data.map(data => {
    return {
      id: data._id,
      refer: data.REFER,
      description: lowerCaseSentence(data.DESCRI),
      color: data.DESCR,
      groupDescription: data.GRUPO.trim(),
      collection: data.CADPROCOLEC,
      avaiableP: data.P || 0,
      avaiableM: data.M || 0,
      avaiableG: data.G || 0,
      aviableGG: data.GG || 0,
      image: data.image,
    }
  })


  return {
    props: {
      inStockProducts,
      // stockCategorys
    },
    revalidate: 60 * 2 // 1hour
  }
}

export default InStockProducts;