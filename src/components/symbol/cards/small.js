import React from 'react'
import {Link} from 'react-router-dom';


function SmallPantheonCard(props) {
    const item = props.symbol
    const style = {
        width: '200px', marginLeft:'10px', marginRight:'10px'
    }
    return <div style={style}><Link className="blockLink" to={`/symbols/${item.symbol_id}`}>

            <h3>{ item.symbol_name }</h3><br />
            {item.kind_name}<br />
          { item.thumbnail ? <img src={`${item.thumbnail.image_url ? item.thumbnail.image_url : require('../../../img/logo.png')}`} height="50px" alt={item.pantheon_name} /> : "" } <br/>
        {item.symbol_description ? item.symbol_description : "Please fill this in with a description."}
    </Link></div>
}

export default SmallPantheonCard
