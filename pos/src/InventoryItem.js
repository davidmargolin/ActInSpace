import React, { Component } from 'react'
import './InventoryItem.css'

export default class InventoryItem extends Component{
  render(){
    return(
      <div className='main'>
        <div className='tinyThing'>
          <img src='https://s2uqdnlqz93lrjbq205ld0eu-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/LilSnappers_Cara.png' height='100px' />
          <p> Oranges </p>
          <input type='text' name='product name' />
          <br/>
          <input type='submit' name='Submit' />
        </div>
      </div>
    )
  }
}
