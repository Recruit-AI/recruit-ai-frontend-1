import React from 'react'
import {Link} from 'react-router-dom';


function SmallPantheonCard(props) {
    const item = props.symbol
    const style = {
        width: '200px',
        padding: '5px'
    }
    return <div style={style}>

            <Link to={`/symbols/${item.symbol_id}`}><h5>{ item.symbol_name }</h5></Link><br />
            {item.kind_name}<br />
          { item.thumbnail ? <img src={`${item.thumbnail.image_url ? item.thumbnail.image_url : require('../../../img/logo.png')}`} height="50px" alt={item.pantheon_name} /> : "" } <br/>
        {item.symbol_description ? item.symbol_description : "Please fill this in with a description."}
    </div>
}

export default SmallPantheonCard
