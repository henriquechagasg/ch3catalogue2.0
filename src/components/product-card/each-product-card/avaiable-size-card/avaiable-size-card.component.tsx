import React from 'react'
import { UseUser } from '../../../../context/userContext';

import styles from './avaiable-size-card.module.scss';

type AvaiableSizeProps = {
    quantity: number,
    size: string,
}

const AvaiableSize = ({ quantity, size }: AvaiableSizeProps) => {

    const { currentUser } = UseUser()

    if (quantity && quantity > 0) {
        return (
            <div className={styles.container}>
                { currentUser ? (
                <span className={styles.quantity}>{ quantity }</span>
                ) : null
                }
                <span className={styles.size}>{ size }</span>
            </div>
        )
    } else {
        return null
    }
}



export default AvaiableSize;