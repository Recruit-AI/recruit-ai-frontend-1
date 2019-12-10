import React from 'react'
import {Link} from 'react-router-dom'

class BasicInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }



  render() {
    const {item} = this.props

    const history = item.history
    const branch_of = history.filter(i => i.history_type === "Branch")
    const direct_ancestor =  history.filter(i => i.history_type === "Direct")
    const other_influences =  history.filter(i => i.history_type === "Influence")

    const influenced = item.influenced
    const branches = influenced.filter(i => i.history_type === "Branch")
    const parent_of =  influenced.filter(i => i.history_type === "Direct")
    const influencedps =  influenced.filter(i => i.history_type === "Influence")

    const history_scheme = [
      {
        pantheons: branch_of,
        title: "Branch Of",
        description: "This pantheon is a branch of:"
      },
      {
        pantheons: direct_ancestor,
        title: "Ancestors",
        description: "This pantheon evolved from:"
      },
      {
        pantheons: other_influences,
        title: "Influences",
        description: "This pantheon is influenced by:"
      },
      {
        pantheons: branches,
        title: "Branches",
        description: "This pantheon splits off into these branches:"
      },
      {
        pantheons: parent_of,
        title: "Descendents",
        description: "This pantheon led to the evolution of:"
      },
      {
        pantheons: influencedps,
        title: "Influenced",
        description: "This pantheon contributed to:"
      },
    ]

    return <div>
            {
              history_scheme.map(scheme => <div>
                {
                  scheme.pantheons.length > 0 ?  
                  <div>
                    <h3>{scheme.title}</h3>  
                    <p>{scheme.description}</p>
                    {scheme.pantheons.map(j => <span key={j.pantheon_name}> 
                      <Link to={`/pantheons/${j.pantheon_id}`}>{j.pantheon_name}</Link>
                    </span> ) }
                  </div> 
                : ""}
              </div>)
            }

    </div>
  }
}

export default BasicInfo
