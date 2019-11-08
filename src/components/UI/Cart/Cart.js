import React from 'react';
import styled from 'styled-components'


const getData = () => {
    if(typeof localStorage !== 'undefined'){
        return JSON.parse(localStorage.getItem('cart'))
    }

    return []
}
const Cart = (props) => {

    const getStorageData = getData()
    return ( 
        <div>
            {getStorageData.map((product, key) => {
                return <div key={key}>
                    <div>{product.name}</div>
                </div>
            })}
        </div>
     );
}
 
export default Cart;