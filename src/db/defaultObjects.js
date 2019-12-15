
const defaultObjects = {
    page: {
        page_title: "",
        page_body_text: "Please enter the body text here.",
        page_category: "About",
        page_symbol: "star",
        page_order: 0
    },  
    post: {
        blog_title: "",
        blog_text: "Please enter the body text here.",
        blog_category: "Blog",
        blog_tags: []
    }
}


//Returns the above object directly
const defaultNewFields = (classKind) => {
    return defaultObjects[`${classKind}`]
}

//Returns the above object along with just the keys in a hash
const defaultNewObj = (classKind) => {
    const values = defaultNewFields(classKind)
    const fields = Object.keys(values)
    return { values, fields }
}

//Takes in an item, and returns the default object with the item's values imposed on top.
const defaultFullFields = (classKind, item) => {
    const defaultObj = defaultNewObj(classKind);
    
    const formFields = {}

    defaultObj.fields.forEach((key) => {
      formFields[key] = item[key] ? item[key] : defaultObj.values[key]
    });

    console.log(formFields)

    return formFields
}

export default {defaultNewFields, defaultNewObj, defaultFullFields}