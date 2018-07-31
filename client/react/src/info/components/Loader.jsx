import React from 'react';
import image from '../../../../../resources/images/info.png'

class Loader extends React.Component {

    render() {
        return <div className="mt-5">
            <img id="loader" src={image} className="mx-auto"/>
            <h1 id="loader-text" className="mx-auto mt-2">Načítá se</h1>
        </div>
    }
}

export default Loader;
