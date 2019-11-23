import React from 'react'
import {Form} from 'react-bootstrap'

import {CSSTransition, SwitchTransition} from 'react-transition-group'

class Pages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredCategory: "-1",
            searchTerm: ""
        }
    }

    linkCard = (item) => {

        return <span style={{display:"inline-block", width: '280px'}}>
                    <a target="_blank" className="amazon-link"
                    href={`https://www.amazon.com/gp/product/${item.amazonId}/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=${item.amazonId}&linkCode=as2&tag=grimwire-20&linkId=${item.linkId}`}>
                        <h3>{item.title }</h3>
                        <img border="0" src={`//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${item.amazonId}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=grimwire-20`} />
                        <p>{ item.description }</p>
                    </a>
                    <img src={`//ir-na.amazon-adsystem.com/e/ir?t=grimwire-20&l=am2&o=1&a=${item.amazonId}`} 
                    width="1" height="1" border="0" alt="" />
                </span>
    }

    handleSelectionChange = (e) => {
        this.setState({filteredCategory: e.target.value})
    }

    render() {
        let lastCategory = "";

        return <SwitchTransition>
            <CSSTransition key={`shop`} in={true} timeout={350} classNames="whole-page" unmountOnExit appear enter exit>
                <div key="shop" style={{minHeight:"100vh"}}>
                    <h3>Choose your wares... if you dare.</h3>
                    <br /><h1>The Crossroads</h1><br />
                    <p>We offer links to places around the web that have the materials & supplies you need.</p>
                    <p>We try to find the best quality products, with great reviews, while remaining affordable.</p>
                    <p>We do make commission from any sales.</p> 
                    <p>If you are already buying supplies, you can look here to help support us at the same time.</p>
                    <br />
                    <div style={{margin:'10px', maxWidth:'400px', margin: "auto"}}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Category Filter</Form.Label>
                            <Form.Control as="select" onChange={this.handleSelectionChange}>
                                <option value="-1">All</option>
                                {
                                    this.categoryList().map(option => 
                                    <option key={option} value={option}>
                                        {option}
                                    </option>)
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    </div>


                    <div>{ 

                    this.fauxDb().map(item => {
                        const categoryPrint = item.category !== lastCategory ? <h2 className="shop-category">{item.category}</h2> : "" 
                        lastCategory = item.category
                        const show = this.state.filteredCategory === "-1" || this.state.filteredCategory === item.category
                        return show ? <span>
                            {categoryPrint}
                            {this.linkCard(item)}
                        </span> : null
                    })
                    
                    }</div>

               </div>
            </CSSTransition>
        </SwitchTransition>


    }

    categoryList = () => {
        let categoryList = []
        this.fauxDb().map(item => { 
            if(categoryList.indexOf(item.category) < 0 ) { 
                categoryList.push(item.category) 
            } 
        })
        return categoryList
    }

    fauxDb = () => {
        return [
            {
                amazonId: 'B07KV8B6Y9', 
                linkId: 'cf1ddd73b755db2e9213229c328ebbb4', 
                category: "Herbs", 
                title: "Spell Herb Sampler", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B01D4064A2', 
                linkId: '282e779eba8c150297e0f573b844b875', 
                category: "Herbs", 
                title: "Deluxe Herb Sampler", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '1634241657', 
                linkId: '0910c38a01967cfd825b77e0a0c922a6', 
                category: "Books", 
                title: "Liber 420", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B00OAK9AN4', 
                linkId: '57f9c9defa44e708121e2d87bfddd596', 
                category: "Herbs", 
                title: "Beginner Herb Sampler", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B07NXZMH6Y', 
                linkId: '6ea994e7133b76d2fb5fa14fbf54d591', 
                category: "Crystals", 
                title: "Beginner Crystal Set", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B07WJHMWRQ', 
                linkId: 'f403e18bdde7468ab8fd2583cd38457c', 
                category: "Crystals", 
                title: "Healing Chakra Crystal Set", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B07BNJ76LM', 
                linkId: 'ec5011fcffdbee05441b2e9a2941cf1d', 
                category: "Crystals", 
                title: "Crystal Tree", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B07K8G35KQ', 
                linkId: 'adf498fe3ede9eab8f382a720306e020', 
                category: "Crystals", 
                title: "Set of Healing Wands", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B01LXZUC1C', 
                linkId: '57f23ea27be4253c8f01e511cc59dd55', 
                category: "Crystals", 
                title: "Box of Crafting Crystals", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B06ZYP2STH', 
                linkId: '2b6874cbc5f479092a0b437f1c4b1755', 
                category: "Crystals", 
                title: "Selenite Wand", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B077HYJYSF', 
                linkId: '636af03688cd2c8401ba15e748dfd493', 
                category: "Magickal Tools", 
                title: "Black Obsidian Crystal Ball", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B06XHGMZVR', 
                linkId: '8d952b65e3f88a119ab5d4084cb125db', 
                category: "Crystals", 
                title: "Crystal Spell Sampler", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B01HVOX9PA', 
                linkId: 'a236f5e5436ef18cb04147d26cb36332', 
                category: "Magickal Tools", 
                title: "Amethyst/Oak Magick Wand", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B01DMX4XCM', 
                linkId: 'ab6b797a839eb865d921a4511cc6bba6', 
                category: "Magickal Tools", 
                title: "Silver/Quartz Chakra Wand", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B07H4N7KMS', 
                linkId: '136b0866eb2f4765bb84eec7c960428c', 
                category: "Magickal Tools", 
                title: "Hematite/Angel Chakra Wand", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: 'B00WR1T4PW', 
                linkId: 'db4ea7b1bd7e1db196ac734c68708593', 
                category: "Journals", 
                title: "Leather Journal w/ Crystals", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '1441310584', 
                linkId: '56b1200bb67aee896b598ae4083a6398', 
                category: "Journals", 
                title: "Black Hardcover Journal w/ Gold Trim", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '0875421180', 
                linkId: 'b861e598fdcce036f13338398601fa45', 
                category: "Books", 
                title: "Wicca: Solitary Practictioner", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '0875420508', 
                linkId: '3581dda1ba9737fdfe5111792d017178', 
                category: "Books", 
                title: "Complete Witchcraft", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '194677409X', 
                linkId: 'aa5d70e5f11fa5e04a33f3a0d163a2aa', 
                category: "Books", 
                title: "The Three Books of Solomon", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '0877282684', 
                linkId: '642501008abc2bc38a34f702e348f384', 
                category: "Books", 
                title: "Book of Thoth", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '1438235720', 
                linkId: '6ad2933f103a2b7b4ace6be1b1873b22', 
                category: "Books", 
                title: "The Kybalion & The Emerald Tablets", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '1912715473', 
                linkId: 'd81841d58bbde1134ccd253295f0f5e6', 
                category: "Books", 
                title: "Starter Wiccan Spellbook", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
            {
                amazonId: '1507209142', 
                linkId: 'fa6a9a9cefb67c6fecb8418c525161e6', 
                category: "Books", 
                title: "Magickal Self Care", 
                description: "Something along the lines of something else and the store goes here up in the blank spot" 
            },
        ].sort((a,b) => { return a.category > b.category ? 1 : -1})
    } 
}

export default Pages


/* <a target="_blank" href="https://www.amazon.com/stores/node/20690677011?_encoding=UTF8&amp;field-lbr_brands_browse-bin=Moon%20Magick&amp;ref_=bl_dp_s_web_20690677011&_encoding=UTF8&tag=grimwire-20&linkCode=ur2&linkId=c68de05a9808cf5cee8fb17469166846&camp=1789&creative=9325">Moon</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=grimwire-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
 */




