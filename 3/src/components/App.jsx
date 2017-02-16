import React from 'react';
import Request from './lib/request.jsx';
import Item from './Item.jsx';

const APIHost = 'http://localhost:6060';
const request = new Request();

export default class App extends React.Component{

    constructor(){
        super();
        this.state = {
            data: []
        };
    }
    componentDidMount(){
        request.get(APIHost + '/stock')
            .then(data =>{
                this.setState({
                    data
                });

            })
    }
    render(){

        return (
            <div style={{textAlign: 'center'}}>
                {
                    this.state.data.map((value,index) => {
                        return <Item key={index} product={value}/>
                    })
                }
            </div>
        );
    }
}