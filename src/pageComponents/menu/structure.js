//Menu Structure






//Array of objects
//Top level items can be dropdown or link
//Second level items must be a link
//View- is a string which sets permissions
//link- is the direct path
//linkTo- dynamic linking set in topMenu.js
//links- sets the dropdown

export default  [
    {name: "Sign Up", view: "no_user", symbol: "user", links: [
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
        {name: "Support Tickets", view: 'admin', link: '/support_tickets', symbol: "comments"},
        {name: "Logout", view: 'all', link: '/users/logout', symbol: "sign-out-alt"}
    ]},
    {name: "Help", view: "all", symbol: "info-circle", links: [
        {name: "Feedback/Contact", view: "all", link: '/feedback/provide', symbol: "comments"},
        {name: "Support/Bug Report", view: "all", link: '/support_tickets/new', symbol: "bug"},
    ]},
]


// {name: "Correspondences", view: "all", symbol: "info-circle", links: [
//     {name: "Tarot Cards", view: "all", link: '/pages/mission', symbol: "bullseye"},
//     {name: "Astrology Signs", view: "all", link: '/pages/questions', symbol: "question"},
//     {name: "Crystals", view: "all", link: '/resources', symbol: 'atlas'},
//     {name: "Chakras", view: "all", link: '/feedback/provide', symbol: "bug"},
//     {name: "Flowers, Herbs, Incense", view: "all", link: '/pages/help', symbol: "exclamation"},
// ]},