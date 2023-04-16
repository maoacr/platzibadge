import React from 'react';
import './styles/Badge.css';
import confLogo from '../images/badge-header.svg';
import Gravatar from './Gravatar';

class Badge extends React.Component{
    render(){
        return (
            <div className="Badge">
                <div className="Badge__header">
                    <img src={confLogo} alt="logo de la conferencia" />
                </div>

                <div className="Badge__section-name">
                    <Gravatar className="Badge__avatar" email={this.props.email}/>
                    <h1>{this.props.firstName} <br></br> {this.props.lastName} </h1>
                </div>

                <div className="Badge__section-info">
                    <h3>{this.props.job}</h3>
                    <div>@{this.props.twitter}</div>
                </div>

                <div className="Badge__footer">
                    #{this.props.firstName ||"FirstName"}{this.props.lastName || "LastName"}
                </div>
            </div>
            
        )
    }
}

export default Badge;