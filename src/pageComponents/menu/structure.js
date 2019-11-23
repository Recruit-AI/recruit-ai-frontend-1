//Menu Structure

//Array of objects
//Top level items can be dropdown or link
//Second level items must be a link
//View- is a string which sets permissions
//link- is the direct path
//linkTo- dynamic linking set in topMenu.js
//links- sets the dropdown

export default  [
    {name: "Encyclopedia", view: "all", symbol: "search", links: [
        {name: "Religions & Cultures", view: "all", link: '/pantheons', symbol: "place-of-worship"},
        {name: "Classes & Categories", view: "all", link: '/categories', symbol: "book"},
        {name: "Lists & Collections", view: "all", link: '/collections', symbol: "list"},
        {name: "Search Symbols", view: "all", link: '/symbols', symbol: "search-plus"},
        {name: "External Resources", view: "all", link: '/resources', symbol: 'atlas'},
        {name: "Shop & Supplies", view: "all", link: '/pages/shop', symbol: 'gem'},
    ]},
    {name: "Features", view: "all", link: '/pages/features', symbol: 'star'},
    {name: "About", view: "all", symbol: "info-circle", links: [
        {name: "Our Mission", view: "all", link: '/pages/mission', symbol: "bullseye"},
        {name: "Site Rules & Guidelines", view: "all", link: '/pages/magick-statement', symbol: "asterisk"},
        {name: "FAQ", view: "all", link: '/pages/questions', symbol: "question"},
        {name: "Feedback/Bug Report", view: "all", link: '/feedback/provide', symbol: "bug"},
        {name: "Help Us Out", view: "all", link: '/pages/help', symbol: "exclamation"},
    ]},
    {name: "Account", view: "no_user", symbol: "user", links: [
        {name: "Register", view: "all", link: '/users/register', symbol: ""},
        {name: "Login", view: "all", link: '/users/login', symbol: ""},
        {name: "Forgot My Password", view: "all", link: '/users/forgottenPassword', symbol: ""},
    ]},
    {name: "Account", view: "logged_in", symbol: "user", links: [
        {name: "Dashboard", view: "all", link: '/users/dashboard', symbol: "user-circle"},
        {name: "View Profile", view: "all", linkTo: 'user_profile', symbol: "address-card"},
        {name: "Edit Profile", view: "all", link: '/users/edit', symbol: "user-cog"},
        {name: "User List", view: 'admin', link: '/admin/users', symbol: "users"},
        {name: "Logs", view: 'admin', link: '/admin/logs', symbol: "cogs"},
        {name: "Feedback", view: 'admin', link: '/feedback', symbol: "comments"},
        {name: "Logout", view: 'all', link: '/users/logout', symbol: "sign-out-alt"}
    ]}
]


// {name: "Correspondences", view: "all", symbol: "info-circle", links: [
//     {name: "Tarot Cards", view: "all", link: '/pages/mission', symbol: "bullseye"},
//     {name: "Astrology Signs", view: "all", link: '/pages/questions', symbol: "question"},
//     {name: "Crystals", view: "all", link: '/resources', symbol: 'atlas'},
//     {name: "Chakras", view: "all", link: '/feedback/provide', symbol: "bug"},
//     {name: "Flowers, Herbs, Incense", view: "all", link: '/pages/help', symbol: "exclamation"},
// ]},