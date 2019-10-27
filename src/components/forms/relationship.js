import React from 'react'
import axios from 'axios'
import HandleForm from './miniHandler'
import MainHandler from './handler'
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

      case "kinds_used_by_pantheons":
      if(this.props.item.pantheons){
        const records = this.props.item.pantheons
        return {
          default_item: {
            kp_kind_id: this.props.item.kind_id,
            kp_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_pantheon_id: item.kp_pantheon_id
            }
          }))
        }
      } else {
        return []
      }


      case "kinds_in_categories":
      if(this.props.item.kinds){
        const records = this.props.item.kinds
        return {
          default_item: {
            ck_category_id: this.props.item.category_id,
            ck_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_kind_id,
            record: {
              id: item.category_kind_id,
              ck_kind_id: item.ck_kind_id
            }
          }))
        }
      } else {
        return []
      }

      case "category_prereqs":
      if(this.props.item.prereqs){
        const records = this.props.item.prereqs
        return {
          default_item: {
            cp_category_id: this.props.item.category_id,
            cp_prereq_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_prereq_id,
            record: {
              id: item.category_prereq_id,
              cp_prereq_id: item.cp_prereq_id
            }
          }))
        }
      } else {
        return []
      }


            case "symbol_connections":
            if(this.props.item.connections){
              const records = this.props.item.connections
              return {
                default_item: {
                  main_symbol_id: this.props.item.symbol_id,
                  connected_symbol_id: 0,
                  connection_description: "",
                  connection_strength: 0,
                  connection_relationship: 0
                },
                records: records.map(item => ({
                  update_id: item.symbol_connection_id,
                  record: {
                    id: item.symbol_connection_id,
                    connected_symbol_id: item.connected_symbol_id,
                    connection_description: item.connection_description || "",
                    connection_strength: item.connection_strength || 0,
                    connection_relationship: item.connection_relationship || 0
                  }
                }))
              }
            } else {
              return []
            }


            case "symbol_pantheons":
            if(this.props.item.pantheons){
              const records = this.props.item.pantheons
              return {
                default_item: {
                  sp_symbol_id: this.props.item.symbol_id,
                  sp_pantheon_id: 0
                },
                records: records.map(item => ({
                  update_id: item.symbol_pantheon_id,
                  record: {
                    id: item.symbol_pantheon_id,
                    sp_pantheon_id: item.sp_pantheon_id
                  }
                }))
              }
            } else {
              return []
            }

            case "images":
            if(this.props.item.images){
              const records = this.props.item.images
              return {
                default_item: {
                  foreign_id: this.props.info.id,
                  foreign_class: this.props.info.class,
                  thumbnail: false,
                  image_url: "",
                  image_title: "",
                  image_description: ""
                },
                records: records.map(item => ({
                  update_id: item.image_id,
                  record: {
                    id: item.image_id,
                    thumbnail: item.thumbnail,
                    image_url: item.image_url,
                    image_title: item.image_title,
                    image_description: item.image_description
                  }
                }))
              }
            } else {
              return []
            }

            case "thumbnail":
            if(this.props.item.thumbnail){
              const records = this.props.item.thumbnail
              return {
                default_item: {
                  foreign_id: this.props.info.id,
                  foreign_class: this.props.info.class,
                  thumbnail: true,
                  image_url: "",
                  image_title: "",
                  image_description: ""
                },
                records: [{
                  update_id: records.image_id,
                  record: {
                    id: records.image_id,
                    image_url: records.image_url,
                    image_title: records.image_title,
                    image_description: records.image_description
                  }
                }]
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
      case "kinds_used_by_pantheons":
        return {title: "Pantheons Using", url: "kinds/pantheons"}
      case "kinds_in_categories":
        return {title: "Contains", url: "categories/kinds"}
      case "category_prereqs":
        return {title: "Prerequisites", url: "categories/prereqs"}
      case "symbol_pantheons":
        return {title: "Uses This Symbol", url: "symbols/pantheons"}
      case "symbol_connections":
        return {title: "Connections", url: "symbols/connections"}
      case "images":
        return {title: "Image Gallery", url: "images"}
      case "thumbnail":
        return {title: "Thumbnail (Main Image)", url: "images"}

    }
  }

  render() {
    const info = this.info();
    return <div>
      <h3>{ info.title }</h3>
      <div style={{display:'flex', justifyContent:'center'}}>
        {
          this.records().records ?
            this.records().records.map(item => <div>
                <HandleForm item={item.record} formClass={this.props.formClass} existing={true} info={info} update={this.props.update} />
              </div>
            )
            : ""
        }
      </div>

      {
        this.props.formClass === 'thumbnail' && this.records().records ? ""
        : <div style={{display:'flex', justifyContent:'center'}}>
          {this.records().default_item ? <div>

            {this.props.formClass === 'symbol_connections' ? <div>
              <MainHandler item={{symbol_name: "", symbol_kind_id: 0}} formClass={"symbols"} existing={false} bulkAdd={true} />
            </div> : ""}

            <HandleForm item={ this.records().default_item } formClass={this.props.formClass} existing={false} info={info} update={this.props.update} />
          </div>
          :""}
        </div>
      }

    </div>
  }


}

export default withRouter(FormHandler)
