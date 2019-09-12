import React from 'react'
import {Link} from 'react-router-dom';


function SmallPantheonCard(props) {
    const item = props.pantheon
    const style = {
        width: '90px'
    }
    return <div style={style}>
            <h2>{ item.thumbnail ? <img src={item.thumbnail.image_url} height="50px" alt={item.pantheon_name} /> : item.pantheon_name[0]}</h2>
            <Link to={`/pantheon/${item.pantheon_id}`}>{ item.pantheon_name }</Link><br />
    </div>
}

export default SmallPantheonCard
