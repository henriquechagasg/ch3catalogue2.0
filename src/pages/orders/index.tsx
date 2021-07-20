import styles from '../../styles/Orders.module.scss'
import Link from "next/link";

import { api } from "../../utils/apiService"
import { GetStaticProps } from 'next';
import { UseUser } from "../../context/userContext";
import { useEffect } from "react";

export function Orders({orders}){

    const {currentUser} = UseUser()

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (window && !user) {
            window.location.href = "/login"
        }
    }, [])


    return (
        <div className={styles.container}>
            {orders.map(order => {
                return (
                    <Link href={`/orders/${order.orderID}`}>
                        <div key={order.orderID} className={styles.card}>
                            <span>{order.Client}</span>
                            <span>{order.date}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get('/orders/all');
  
    return {
      props: {
        orders: data,
      },
      revalidate: 60 // 1minute
    }
  }
  
  export default Orders;