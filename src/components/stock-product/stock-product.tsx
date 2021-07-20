import LazyLoad from 'react-lazyload';
import 'react-toastify/dist/ReactToastify.css';

import styles from './stock-product.module.scss';

type stockItem = {
    id: string,
    refer: string,
    description: string,
    color: string,
    groupDescription: string,
    collection: string, 
    avaiableP: number,
    avaiableM: number,
    avaiableG: number,
    avaiableGG: number,
    image: [string],

}

type StockProductProps = {
    stockItem: stockItem,
}

export function StockProduct({stockItem}: StockProductProps) {

    const total = ((stockItem.avaiableP || 0) + 
        (stockItem.avaiableM) || 0 +
        (stockItem.avaiableG) || 0 +
        (stockItem.avaiableGG) || 0)
    return (
        <>
            <div className={styles.card}>
                <LazyLoad>
                    <div className={styles.image}>
                        {stockItem.image[0] ? (
                            <img src={stockItem.image[0]} alt="No image =/"/>
                        ) : (
                            <img src={""} alt="No image =/"/>
                        )}
                        
                    </div>
                </LazyLoad>
                <div className={styles.stockDetails}>
                    <div>
                    <span><b>{stockItem.refer}</b></span>
                    <br />
                    <span className={styles.title}>{stockItem.description} {stockItem.color}</span>
                    </div>
                    <div className={styles.stockQuantitys}>
                        <span>{stockItem.avaiableP}<b>P</b></span>
                        <span>{stockItem.avaiableM}<b>M</b></span>
                        <span>{stockItem.avaiableG}<b>G</b></span>
                        <span>{stockItem.avaiableGG || 0}<b>GG</b></span>
                    </div>
                </div>
            </div>
        </>
        
    )
}