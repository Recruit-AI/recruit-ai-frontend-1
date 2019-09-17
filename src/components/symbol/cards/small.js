import React from 'react'
import {Link} from 'react-router-dom';


function SmallPantheonCard(props) {
    const item = props.symbol
    const style = {
        width: '200px',
        height: '200px',
        padding: '5px'
    }
    return <div style={style}>

            <Link to={`/symbols/${item.symbol_id}`}>{ item.symbol_name }</Link><br />
            { item.thumbnail ? <img src={`http://localhost:4001/uploads/${item.thumbnail.image_url}`} height="50px" alt={item.pantheon_name} /> : "" } <br/>
            {item.symbol_description}
    </div>
}

export default SmallPantheonCard
