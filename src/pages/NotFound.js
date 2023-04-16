import React from 'react';
import '../images/stars.svg';
import '../components/styles/NotFound.css';
import NotFoundImage from '../images/Error.svg';

function NotFound(){
    return (
        <div className="caja_NotFound">
            <div className="notFound_ImageContenedor">
                <img className="notFound_Image" src={NotFoundImage} alt="imagen 404"/>
            </div>
            <h1>Not Found</h1>
        </div>
        
    )
}

export default NotFound;