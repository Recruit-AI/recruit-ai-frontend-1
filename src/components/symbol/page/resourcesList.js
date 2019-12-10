import React from 'react'

const ResourcesList = (props) => {
  const resources = props.item.resources

  return <div><div className="divider" /><div className="text-container">
    <h3>Resources</h3>
    <p>A list of articles & links that you can use to explore this topic further</p>
    {
      resources.map((resource, i) => <div><a target="_blank" href={resource.resource_link}>
        <p><b>{resource.resource_title}</b> ({resource.resource_type})</p>
      </a>
      <p>{resource.sr_description}</p></div>)
    }
  </div><div className="reverse-divider" /></div>

}

export default ResourcesList
