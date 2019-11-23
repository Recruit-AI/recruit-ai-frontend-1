import React from "react"

class ImageCreator extends React.Component {
    constructor(props) {
        super(props)
        this.canvas = React.createRef();
        this.logo_image = React.createRef();
        this.article_image = React.createRef();
        this.state = {}
    }

    componentDidMount = () => {
        this.updatePageImage();
    }

    componentWillReceiveProps = (newProps) => { 
        this.updatePageImage(newProps);
    
    }

    

    updatePageImage = (props = this.props) => {
        const {canvas, logo_image, article_image} = this
        let settings = new Settings({canvas, logo_image, article_image, item: this.props.item})
      }


      render () {
        return <div style={{overflowX:'scroll'}}>
            <h3>Save/Download this article as a sharable image:</h3>
            <canvas ref={this.canvas} width={800} height={800} />
            <img ref={this.logo_image} src={require('../../../img/logo.png')} style={{display:'none'}}/>
            {}
            <img ref={this.article_image} src={
                this.props.item.thumbnail ? 
                this.props.item.thumbnail.image_url : 
                require('../../../img/logo.png')
                } style={{display:'none'}}/>
            
        </div>
      }

}

export default ImageCreator

class Settings {
    constructor(props) {
        this.canvas = props.canvas
        this.ctx = props.canvas.current ? props.canvas.current.getContext("2d") : {}
        this.logo_image = props.logo_image
        this.article_image = props.article_image
        this.item = props.item

        const init_h = 800
        const init_w = 800
        const init_p = 20

        this.settings = {
            dim: {
                h: init_h,
                w: init_w,
                headerSize: 100
            },
            style: {
                padding: 20,
                fonts: {
                    text: {family: 'Verdana', size: 22, color: "#333"},
                    subtext: {family: 'Courier', size: 16, color: "#333"},
                    warning: {family: 'Courier', size: 18, color: "#fbb"},
                    header: {family: 'Courier', size: 28, color: "#222"},
                    top: {family: 'Impact', size: 52, color: "black"},
                    spacer: {family: 'Courier', size: 6, color: "black"},
                },
            }
        }

        this.pos = {
            top: 0,
            bottom: init_h - init_p*2,
            left: init_w / 2,
            right: init_w - init_p
        }

        if(this.ctx) {
            this.initPage();
        }   
    }

    initPage = () => {
        
        const img = this.logo_image.current
        const articleImg = this.article_image.current
        const colors = this.item.connections.filter((a) =>  a.kind_name === 'Colors')
  
        img.onload = () => {
            var grd = this.ctx.createLinearGradient(0, 0, this.settings.dim.w, this.settings.dim.h);
            colors.map((color, i) => {
                const colorName = color.symbol_name.split(' (')[0].split(' ').join('')
                console.log(colorName)
                try{
                    grd.addColorStop( (i/colors.length) ,  colorName )
                }
                catch{}
            })
            this.ctx.textAlign = 'center'
    
            // Fill with gradient
            this.ctx.fillStyle = grd;

            this.ctx.fillRect(0, 0, this.settings.dim.w, this.settings.dim.h);
            this.ctx.fillStyle = "rgba(250,250,250,.4)"
            this.ctx.fillRect(0, 0, this.settings.dim.w, this.settings.dim.h);
                
            this.ctx.drawImage(img, 
                this.settings.style.padding, 
                this.settings.style.padding, 
                this.settings.dim.headerSize, 
                this.settings.dim.headerSize)

            this.printInfo();
            this.printBottom();
        }
        articleImg.onload = () => {
            this.ctx.drawImage(articleImg, 
                this.pos.right - this.settings.dim.headerSize, 
                this.settings.style.padding, 
                this.settings.dim.headerSize, 
                this.settings.dim.headerSize)
        }
    }
    

    printInfo = () => {
        this.printLine(this.item.symbol_name.split(' (')[0] + " Correspondences", 'top', 'top', 650)
        this.printLine(this.item.symbol_description, 'text', 'top', 650)
        if(this.item.health_warning) { this.printLine("WARNING: " + this.item.health_warning, 'warning') }
        if(this.item.other_spellings) { this.printLine("Also spelled: " + this.item.other_spellings, 'subtext') }

        const connections = this.item.connections
        const other = [...connections].filter(c => (c.connection_relationship === 4 || c.connection_relationship == 3) ).sort((a, b) => a.kind_name > b.kind_name ? 1 : -1)
        const related = [...connections].filter(c => c.connection_relationship === 2).sort((a, b) => a.kind_name > b.kind_name ? 1 : -1)

        this.insertColumns(
            () => { 
                if(other[0]) { 
                    let last = other[0].kind_name
                    this.printLine("", 'spacer')
                    this.printLine(last, 'text', 'top', 400)
                    let printQueue = ''
                    other.map((connection, i) => {
                        if(connection.kind_name != last) { 
                            this.printLine(printQueue, 'subtext', 'top', 400) 
                            this.printLine("", 'spacer')
                            this.printLine(connection.kind_name, 'text', 'top', 400)
                            printQueue = ""                     
                        } 
                        printQueue += connection.symbol_name.split(' (')[0] + (other[(i+1)] && connection.kind_name === other[(i+1)].kind_name ? "; " : "")
                        last = connection.kind_name
                    }) 
                    this.printLine(printQueue, 'subtext', 'top', 400) 
                }
            },
            () => { 
                if(related[0]) {
                    let last = related[0].kind_name
                    this.printLine(last, 'text', 'top', 400)
                    let printQueue = ''
                    related.map((connection, i) => {
                        if(connection.kind_name != last) { 
                            this.printLine(printQueue, 'subtext', 'top', 400) 
                            this.printLine(connection.kind_name, 'text', 'top', 400)
                            printQueue = ""                     
                        } 
                        printQueue += connection.symbol_name.split(' (')[0] + (related[(i+1)] && connection.kind_name === related[(i+1)].kind_name ? "; " : "")
                        last = connection.kind_name
                    }) 
                    this.printLine(printQueue, 'subtext', 'top', 400) 
                }
            }
        )
        
        


    }

    printBottom = () => {
        this.printLine("www.GrimWire.netlify.com", 'header', 'bottom')
    }

    printLine = (text, font, direction = 'top', size = 800) => {
        const selectedFont = this.settings.style.fonts[font]
        this.ctx.font = `${selectedFont.size}px ${selectedFont.family}`
        this.ctx.strokeStyle = selectedFont.color

        //Turn the string into an array of text lines
        const textArray = this.textArray(text, size)

        if(direction === 'top') {
            textArray.map(line => {
                if(line && line.length > 0) {
                    this.ctx.fillStyle = "rgba(255,255,255,.65)"
                    const buffer = 8;
                    const w = this.ctx.measureText(line).width + buffer*4
                    const x = this.pos.left - (w/2.0) 
                    const y = this.pos.top + (selectedFont.size * .5) 
                    const h = selectedFont.size + buffer
                    this.ctx.fillRect(x, y, w, h)
                }

                this.pos.top = this.pos.top + selectedFont.size * 1.5
                this.ctx.fillStyle = selectedFont.color
                this.ctx.strokeText(line, this.pos.left, this.pos.top)
                this.ctx.fillText(line, this.pos.left, this.pos.top)
            })
        }
        else{
            textArray.map(line => {
                if(line && line.length > 0) {
                    this.ctx.fillStyle = "rgba(255,255,255,.65)"
                    const buffer = 8;
                    const w = this.ctx.measureText(line).width + buffer*2
                    const x = this.pos.left - (w/2.0) 
                    const y = this.pos.bottom - (selectedFont.size * .5) - buffer
                    const h = selectedFont.size + buffer
                    this.ctx.fillRect(x, y, w, h)
                }

                this.ctx.fillStyle = selectedFont.color
                this.ctx.strokeText(line, this.pos.left, this.pos.bottom)
                this.ctx.fillText(line, this.pos.left, this.pos.bottom)
                this.pos.bottom = this.pos.bottom - (this.settings.style.padding + selectedFont.size)
            })
        }
        
    }

    //Recursive function that turns a string of text into an array of strings that are all less than the provided length in px
    textArray = (text, size) => {
        if(this.ctx.measureText(text).width > .9 * size) {
            const rawArray = text.split(" ")
            const rawSize = rawArray.length
            const half = Math.ceil(rawSize / 2)

            const a = rawArray.slice(0, half).join(" ")
            const b = rawArray.slice(half).join(" ")

            return [
                ...this.textArray(a, size),
                ...this.textArray(b, size)
            ]

        }else {
            return [text]
        }
    }

    //Takes two callbacks to call as columns
    insertColumns = (column_1, column_2) => {
        //parse to create a copy
        this.pos.top += this.settings.style.padding
        let column_start = Number.parseInt(this.pos.top)
        this.pos.left = this.settings.dim.w / 4

        column_1();

        let column_end = Number.parseInt(this.pos.top)
        
        this.pos.top = column_start
        this.pos.left = this.settings.dim.w / 4 * 3

        column_2();

        //Reset the top pos and make sure it's the lower of the two columns
        this.pos.left = this.settings.dim.w / 2
        if(column_end > this.pos.top) { this.pos.top = column_end }
        this.pos.top += this.settings.style.padding
    }

}

  
            
