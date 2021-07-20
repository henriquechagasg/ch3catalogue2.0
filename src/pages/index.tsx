import React from 'react';
import { api } from "../utils/apiService"
import { GetStaticProps } from 'next';

import { DisplayProducts } from '../components/display-products/display-products.component'

import lowerCaseSentence from '../utils/sentenceToLowerCase';

import styles from '../styles/Home.module.css'
import { UseDropdown } from '../context/dropdownContext';

export function Home({ allProducts }){

  const {categorySelected} = UseDropdown()

  if (categorySelected === "Todas") {
    return (
      <div className={styles.container}>
        <DisplayProducts allProducts={allProducts} />
      </div>
    )
  } else {
    const filteredProducts = allProducts.filter(product => 
      product.groupDescription === categorySelected.toUpperCase()
    )

    return (
      <div className={styles.container}>
      < DisplayProducts allProducts={filteredProducts} />
      </div>
    )
  }


}



export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/');

  const allProducts = data.map(data => {
    return {
      id: data._id,
      refer: data.REFER,
      description: lowerCaseSentence(data.DESCRI),
      groupDescription: data.CADPROGDESCR,
      collection: data.CADPROCOLEC,
      avaiableP: data.P,
      avaiableM: data.M,
      avaiableG: data.G,
      aviableGG: data.GG,
      images: data.image,
      isAdded: data.isAdded,
      pSizePrice: data.pPrice,
      mSizePrice: data.mPrice,
      gSizePrice: data.gPrice,
      ggSizePrice: data.ggPrice
    }
  })

  return {
    props: {
      allProducts,
    },
    revalidate: 60 * 2 // 1hour
  }
}

export default Home;