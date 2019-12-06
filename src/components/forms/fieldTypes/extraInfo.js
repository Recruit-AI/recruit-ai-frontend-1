import React from 'react'
import BasicField from './basic'

export default (props) => {
    const {item} = props
    const extra_info = item.extra_info

    if(extra_info) {
        return <div>
            <h5>Collection Related Information</h5>
            { 
                Object.entries(extra_info)
                .map(
                    i => <BasicField {...props} key={i[0]} field={i} type="text" /> 
                )
            } 
        </div>
    } else {
        return ""
    }
}