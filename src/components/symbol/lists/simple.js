import React from 'react'
import SmallSymbolCard from '../cards/small'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

function SimpleSymbolList(props) {
    const style = {
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'center'
    }


    //a key is created by appending each id onto each other, creating at most a length-60 string, up to 100,000 entries
    const renderKey = props.symbols.length > 1 ? props.symbols.reduce((sum, item) => { return `${sum}${item.symbol_id}`}) : "0"

    return <SwitchTransition><CSSTransition key={renderKey}
      in={true} timeout={150} classNames="search-page" unmountOnExit>
      <div style={style} key={renderKey}>
        { props.symbols.length > 0 ? props.symbols.map(item =>
            <SmallSymbolCard symbol={item} key={item.symbol_name}  />
        ) : "There are no results." }
    </div></CSSTransition></SwitchTransition>
}

export default SimpleSymbolList
