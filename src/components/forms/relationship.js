import React from 'react'
import axios from 'axios'
import HandleForm from './miniHandler'
import { withRouter } from "react-router-dom";


class FormHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  records()  {
    switch(this.props.formClass) {
      case "pantheons_history":
        if(this.props.item.history){
          const records = this.props.item.history
          return {
            default_item: {
              influenced_id: this.props.item.pantheon_id,
              influencer_id: 0
            },
            records: records.map(item => ({
              update_id: item.pantheon_history_id,
              record: {
                id: item.pantheon_history_id,
                influencer_id: item.influencer_id
              }
            }))
          }
        } else {
          return []
        }
      case "pantheons_influenced":
        if(this.props.item.history){
          const records = this.props.item.influenced
          return {
            default_item: { influencer_id: this.props.item.pantheon_id, influenced_id: 0 },
            records: records.map(item => ({
              update_id: item.pantheon_history_id,
              record: {
                id: item.pantheon_history_id,
                influenced_id: item.influenced_id
              }
            }))
          }
        } else {
          return []
        }
      case "pantheons_use_kinds":
      if(this.props.item.history){
        const records = this.props.item.uses_kinds
        return {
          default_item: {
            kp_pantheon_id: this.props.item.pantheon_id,
            kp_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_kind_id: item.kp_kind_id
            }
          }))
        }
      } else {
        return []
      }
    }
  }

  info()  {
    switch(this.props.formClass) {
      case "pantheons_history":
        return {title: "History", url: "pantheons/history"}
      case "pantheons_influenced":
        return {title: "Influenced", url: "pantheons/history"}
      case "pantheons_use_kinds":
        return {title: "Kinds Used", url: "kinds/pantheons"}
    }
  }

  render() {
    const info = this.info();
    return <div>
      <h3>{ info.title }</h3>
      <div style={{display:'flex', justifyContent:'center'}}>
        {
          this.records().records ?
            this.records().records.map(item => <HandleForm item={item.record} formClass={this.props.formClass} existing={true} info={info} update={this.props.update} />)
            : ""
        }
      </div>

      <div style={{display:'flex', justifyContent:'center'}}>
        {this.records().default_item ?
        <HandleForm item={ this.records().default_item } formClass={this.props.formClass} existing={false} info={info} update={this.props.update} />
        :""}
      </div>
    </div>
  }


}

export default withRouter(FormHandler)
