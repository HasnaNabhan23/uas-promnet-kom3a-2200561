import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div >
                <footer className = "footer" style={{ textAlign:'center' }} >
                    <span className="text-muted">
                        Hasna Nabhan Arasy
                         @hsn_arasy</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent
