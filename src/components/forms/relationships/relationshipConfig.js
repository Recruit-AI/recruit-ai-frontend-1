import React from 'react'

// ase "pantheons_history":
//   return {
// case "pantheons_influenced":
//   return }
// case "pantheons_use_kinds":
//   return {}
// case "kinds_used_by_pantheons":
//   return {}
// case "kinds_in_categories":
//   return {}
// case "category_prereqs":
//   return {}
// case "symbol_pantheons":
//   return {}
// case "symbol_connections":
//   return {}
//   return {}
// case "images":
// case "thumbnail":
//   return {}

export default (props) => {
  switch(props.formClass) {
    case "pantheons_history":
      if(props.item.history){
        const records = props.item.history
        return {
          default_item: {
            influenced_id: props.item.pantheon_id,
            influencer_id: 0
          },
          records: records.map(item => ({
            update_id: item.pantheon_history_id,
            record: {
              id: item.pantheon_history_id,
              influencer_id: item.influencer_id,
            }
          })),
          title: "History",
          url: "pantheons/history"
        }
      } else {
        return []
      }
      break;
    case "pantheons_influenced":
      if(props.item.history){
        const records = props.item.influenced
        return {
          default_item: { influencer_id: props.item.pantheon_id, influenced_id: 0 },
          records: records.map(item => ({
            update_id: item.pantheon_history_id,
            record: {
              id: item.pantheon_history_id,
              influenced_id: item.influenced_id
            }
          })),
          title: "Influenced",
          url: "pantheons/history"
        }
      } else {
        return []
      }
      break;

    case "pantheons_use_kinds":
      if(props.item.history){
        const records = props.item.uses_kinds
        return {
          default_item: {
            kp_pantheon_id: props.item.pantheon_id,
            kp_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_kind_id: item.kp_kind_id
            }
          })),
          title: "Kinds Used",
          url: "kinds/pantheons"
        }
      } else {
        return []
      }
      break;

    case "kinds_used_by_pantheons":
      if(props.item.pantheons){
        const records = props.item.pantheons
        return {
          default_item: {
            kp_kind_id: props.item.kind_id,
            kp_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.kinds_to_pantheons_id,
            record: {
              id: item.kinds_to_pantheons_id,
              kp_pantheon_id: item.kp_pantheon_id
            }
          })),
          title: "Pantheons Using",
          url: "kinds/pantheons"
        }
      } else {
        return []
      }
      break;

    case "kinds_in_categories":
      if(props.item.kinds){
        const records = props.item.kinds
        return {
          default_item: {
            ck_category_id: props.item.category_id,
            ck_kind_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_kind_id,
            record: {
              id: item.category_kind_id,
              ck_kind_id: item.ck_kind_id
            }
          })),
          title: "Contains",
          url: "categories/kinds"
        }
      } else {
        return []
      }
      break;

    case "category_prereqs":
      if(props.item.prereqs){
        const records = props.item.prereqs
        return {
          default_item: {
            cp_category_id: props.item.category_id,
            cp_prereq_id: 0
          },
          records: records.map(item => ({
            update_id: item.category_prereq_id,
            record: {
              id: item.category_prereq_id,
              cp_prereq_id: item.cp_prereq_id
            }
          })),
          title: "Prerequisites",
          url: "categories/prereqs"
        }
      } else {
        return []
      }
      break;

    case "symbol_connections":
      if(props.item.connections){
        const records = props.item.connections
        return {
          default_item: {
            main_symbol_id: props.item.symbol_id,
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
          })),
          title: "Connections",
          url: "symbols/connections"
        }
      } else {
        return []
      }
      break;

    case "symbol_pantheons":
      if(props.item.pantheons){
        const records = props.item.pantheons
        return {
          default_item: {
            sp_symbol_id: props.item.symbol_id,
            sp_pantheon_id: 0
          },
          records: records.map(item => ({
            update_id: item.symbol_pantheon_id,
            record: {
              id: item.symbol_pantheon_id,
              sp_pantheon_id: item.sp_pantheon_id
            }
          })),
          title: "Uses This Symbol",
          url: "symbols/pantheons"
        }
      } else {
        return []
      }
      break;

    case "images":
      if(props.item.images){
        const records = props.item.images
        return {
          default_item: {
            foreign_id: props.info.id,
            foreign_class: props.info.class,
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
          })),
          title: "Image Gallery",
          url: "images"
        }
      } else {
        return []
      }
      break;

    case "thumbnail":
      if(props.item.thumbnail){
        const records = props.item.thumbnail
        return {
          default_item: {
            foreign_id: props.info.id,
            foreign_class: props.info.class,
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
          }],
          title: "Thumbnail (Main Image)",
          url: "images"
        }
      } else {
        return []
      }
      break;
    }
  }
