import tarot from './tarotcards'
import signs from './astrosigns'
import gods from './dieties'
import letters from './hebrewletters'

const randos = [ 
    {
        name: "Air",
        pantheons: ["Occult", "Wicca"],
        kind: "Elements",
        otherSpellings: [""],
        description: "The suit of air, representing mind, intellect, wisdom, and creativity.",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Freedom",
        pantheons: ["Traditional"],
        kind: "Values",
        otherSpellings: [""],
        description: "",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Travel, destination, journeys",
        pantheons: ["Traditional"],
        kind: "Phenoms",
        otherSpellings: [""],
        description: "Going on an adventure, literally or not, can be fun, scary, and exciting, depending on your perspective.",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Good Luck",
        pantheons: [""],
        kind: "Properties",
        otherSpellings: [""],
        description: "Good things happening randomly & generally going your way",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Complete Health & Healing",
        pantheons: [""],
        kind: "Properties",
        otherSpellings: ["For physical, mental, and spiritual health & healing"],
        description: "",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Parabrahman",
        pantheons: ["Hindi"],
        kind: "Dieties",
        otherSpellings: [""],
        description: "The Ulitmate Self",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: null, 
    },
    {
        name: "Liber 777",
        pantheons: ["Occult"],
        kind: "Sources",
        otherSpellings: [""],
        description: "A big book of attributions",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: 12,
        info: {
            author: "Alister Crowley",
            media: "Book",
            link: ""
        }
    },
    {
        name: "Book of Thoth",
        pantheons: ["Occult"],
        kind: "Sources",
        otherSpellings: [""],
        description: "A big book of attributions",
        thumbnail: "", images: [""],
        backgroundInfo: "", meaningInfo:"", number: 12,
        info: {
            author: "Alister Crowley",
            media: "Book",
            link: ""
        }
    }
]

export default [...tarot, ...gods, ...letters, ...signs, ...randos]

/*
{
    name: "",
    pantheons: [""],
    kind: "",
    otherSpellings: [""],
    description: "",
    thumbnail: "", images: [""],
    backgroundInfo: "", meaningInfo:"", number: null, 
}
*/