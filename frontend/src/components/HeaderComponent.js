import React, { Component } from 'react';
import './bootstrap/dist/css/bootstrap.min.css';
import pic1 from './Assets/img/pic1.png';
import nanaa from './Assets/img/nanaa.png';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor:'#AC87C5' }}>
                        <div className="container-fluid">
                            <a className="navbar-brand mr-5" href="/inventories " style={{ color:'white' }}>
                                <img
                                    src={pic1}
                                    alt="Logo"
                                    style={{ width:60, height:60, borderRadius:30 }}
                                />
                                <span className='' style={{ marginTop:20 }}>Inventory App</span>                                
                            </a>
                            <div className='col-md-9'>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ float: 'right' }}>
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link active mt-2" aria-current="page" href="/inventories" style={{fontSize:20, color: 'white' }}>
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link mt-2 mr-2" href="#" style={{fontSize:20, color: 'white' }}>
                                                Link
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="navbar-brand" href="/inventories">
                                                <img
                                                    src={nanaa}
                                                    alt="Logo"
                                                    style={{ width:60, height:60, borderRadius:30 }}
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
