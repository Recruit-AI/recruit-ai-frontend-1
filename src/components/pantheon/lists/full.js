import React from 'react'
import ListItemPantheonCard from '../cards/listItem'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

function SimplePantheonList(props) {
    const style = {
    }

    //a key is created by appending each id onto each other, creating at most a length-60 string, up to 100,000 entries
    const renderKey = props.pantheons.length > 1 ? props.pantheons.reduce((sum, item) => { return `${sum}${item.pantheon_id}`}) : "0"

    return <SwitchTransition><CSSTransition key={renderKey}
      in={true} timeout={150} classNames="search-page" unmountOnExit>
      <div style={style} key={renderKey}>

        <hr />
        { props.pantheons.map(item =>
            <div><ListItemPantheonCard key={item.pantheon_name} pantheon={item} /></div>
        )}
    </div>
    </CSSTransition></SwitchTransition>
}

export default SimplePantheonList
