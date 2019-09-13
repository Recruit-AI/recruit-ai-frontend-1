import React from 'react'
import {Link} from 'react-router-dom';


function SmallKindCard(props) {
    const item = props.kind
    const style = {
        width: ''
    }
    return <div style={style}>
            <Link to={`/collections/${item.id}`}>{ item.name }</Link>
    </div>
}

export default SmallKindCard
