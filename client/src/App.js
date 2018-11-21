import React, { Component } from 'react';
import {Jumbotron} from 'reactstrap';
import HeaderNavigation from './components/HeaderNavigation'
import ConnectedSearch from './components/Search'

import './index.css';

class App extends Component {

    render() {

        return (
           <div className='App'>
                <div>
                    <HeaderNavigation />
                </div>
                <div>
                    <Jumbotron>
                        <h1> Sample App </h1>
                        <p> Brown Center for Biomedical Informatics </p>
                    </Jumbotron>
                </div>
                <div>
                    <ConnectedSearch/>
                </div>
            </div>
        );
    }
}

export default App;