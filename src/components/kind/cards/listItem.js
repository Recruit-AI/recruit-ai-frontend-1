import React from 'react'
import {Link} from 'react-router-dom';


function SmallKindCard(props) {
    const item = props.kind
    const style = {
        width: ''
    }
    return <Link className='blockLink' to={`/collections/${item.kind_id}`}><div style={style}>

            <h3>{ item.kind_name }</h3><br />
            {item.kind_description || "Please enter a description." }<br />
          <img src={ item.thumbnail && item.thumbnail.image_url ? item.thumbnail.image_url : require('../../../img/logo.png') } height="100px;" />

    </div></Link>
}

export default SmallKindCard
