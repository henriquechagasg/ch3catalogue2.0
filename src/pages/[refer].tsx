import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { api } from '../utils/apiService';
import { DisplayProducts } from '../components/display-products/display-products.component';
import { FaCartPlus } from 'react-icons/fa';


import styles from '../styles/Refer.module.css';
import lowerCaseSentence from '../utils/sentenceToLowerCase';


export default function ReferencePage({ eachProduct }) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <span>Clique no ícone <span><FaCartPlus/></span> para  adicionar ao carrinho.</span>
            </div>
            <DisplayProducts eachProduct={ eachProduct }/>
        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { refer } = ctx.params;

    const { data } = await api.get(`/${refer}`);

    const eachProduct = data.map(data => {
        if (data.isAdded){
            return {
                id: data._id,
                refer: data.REFER,
                description: lowerCaseSentence(data.DESCRI.trim()), 
                color: lowerCaseSentence(data.DESCR.trim()),
                groupDescription: data.GRUPO.trim(),
                image: data.image, 
                avaiableP: data.P,
                avaiableM: data.M,
                avaiableG: data.G,
                avaiableGG: data.GG,
                pSizePrice: data.pPrice,
                mSizePrice: data.mPrice,
                gSizePrice: data.gPrice,
                ggSizePrice: data.ggPrice 
            }
        } else {
            return
        }
    })

    return {
        props: {
            eachProduct,
        },
        revalidate: 60 * 2 // 2 minutes
    };
};