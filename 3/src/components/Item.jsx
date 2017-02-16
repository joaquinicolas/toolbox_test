import React from 'react';

export default class Item extends React.Component{
    constructor(){
        super();
    }
    render(){


        return (
            <div>
                <span>
                    <div className="robot-info">
                        <h2 className="robot-weapon">{this.props.product.name}</h2>
                        <div>${this.props.product.price}</div>
                    </div>
                </span>
            </div>
        );
    }
}