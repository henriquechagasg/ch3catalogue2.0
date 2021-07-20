import React from 'react';

// import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';
import styles from './with-spinner.module.scss';

export function Spinner(){
        return (
            <div className={styles.overlay}>
                <div className={styles.container}>
                </div>
            </div>
            // <SpinnerOverlay>
            //     <SpinnerContainer />
            // </SpinnerOverlay>
        )
    //     ) : (
    //         <WrappedComponent {...otherProps} />
    //     )
    // }

} 

