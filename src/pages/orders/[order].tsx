import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../utils/apiService";

import styles from './order.module.scss'

export default function eachOrder({eachOrder}) {
    const order = eachOrder[0]
    return (
        <div className={styles.container}>
            <span>{order.Client}</span>
            <span>{order.Phone}</span>
            <span>{order.Email}</span>
            <span>Pedido:</span>
            <div>
                {order.Products.map(product => {
                    return (
                        <div className={styles.quantity}>
                            <span>{product.refer} - {product.description} - {product.color}</span>
                            <span>  {product.pSizeOrder}<b>P</b> </span>
                            <span>  {product.mSizeOrder}<b>M</b> </span>
                            <span>  {product.gSizeOrder}<b>G</b> </span>
                            <span>  {product.ggSizeOrder}<b>GG</b> </span>

                        </div>
                    )
                })}
            </div>

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
    const { order } = ctx.params;

    const { data } = await  api.get(`orders/${order}`);

    return {
        props: {
            eachOrder: data,
        },
        revalidate: 60 // 1 minute
    };
};
