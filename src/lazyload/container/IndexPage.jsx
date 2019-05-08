import React, {Component} from 'react';

import Lasyload from '../components/Lazyload';

export default class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    
    componentDidMount(){
        
    }
    
    componentWillMount(){
        
    }
    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate() {
        
    }
    componentWillUnmount(){
    }
    shouldComponentUpdate(nextprops, nextstate) {
        return true;
    }
    render() {
        let list = [];
        for(let i=0;i<100;i++){
            list.push(i)
        }
        return (
            <div>
                {list.map((i)=>{
                    return <Lasyload key={i}><img src={require('../static/images/pic.jpg')} style={{display:'block',width:'100%',height:'100px'}}  /></Lasyload>
                })}
            </div>
        )
    }
}
