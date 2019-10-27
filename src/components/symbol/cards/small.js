import React from 'react'
import {Link} from 'react-router-dom';


function SmallPantheonCard(props) {
    const item = props.symbol
    const style = {
        width: '200px',
        padding: '5px'
    }
    return <div style={style}>

            <Link to={`/symbols/${item.symbol_id}`}>{ item.symbol_name }</Link><br />
            {item.kind_name}<br />
            { item.thumbnail ? <img src={`${item.thumbnail.image_url}`} height="50px" alt={item.pantheon_name} /> : "" } <br/>
            {item.symbol_description}
    </div>
}

export default SmallPantheonCard
