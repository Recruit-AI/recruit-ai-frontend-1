import React from 'react'
import SmallSymbolCard from '../cards/small'

function SimpleSymbolList(props) {
    const style = {
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'center'
    }

    return <div style={style}>
        { props.symbols.length > 0 ? props.symbols.map(item =>
            <SmallSymbolCard symbol={item} key={item.symbol_name}  />
        ) : "There are no results." }
    </div>
}

export default SimpleSymbolList
