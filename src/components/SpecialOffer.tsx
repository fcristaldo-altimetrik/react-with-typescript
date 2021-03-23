import React from 'react'
import { Pizza } from './types'
import classes from './SpecialOffer.module.css';
import { AddToCartProps, WithAddToCartProps } from './AddToCartHOC';

interface Props{
  pizza: Pizza;
}

const SpecialOffer:React.FC<Props> = ({pizza}) => {
  
  return (
    <div className={classes.container}>
      <h1>{pizza.name}</h1>
      <p>{pizza.description}</p>
      <p> {pizza.price} </p>
      <WithAddToCartProps>
        {({addToCart})=>(
          <button type="button" onClick={()=>addToCart({id:pizza.id,price:pizza.price,name:pizza.name})}>
            Add to Cart
          </button>
          )
        }
      </WithAddToCartProps>
    </div>
  )
}

export default SpecialOffer
