import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {checkVisible,getScrollParent} from '../util';
export default class Lazyload extends Component{
    constructor(props){
        super(props);
        this.state = {isVisible:false};
        this.checkedVisible = this.checkedVisible.bind(this)
    }
    componentDidMount(){
        let parent = this.props.parent,node = ReactDOM.findDOMNode(this);
        let isVisible = checkVisible(node,100,parent);
        if(isVisible) {
            this.setState({isVisible:true});
        }else{
            this.parent = parent||window;
            this.parent.addEventListener('scroll',this.checkedVisible());
        }
    }
    componentWillUnMount(){
        
    }
    checkedVisible(){
        let parent = getScrollParent(this.props.parent),node = ReactDOM.findDOMNode(this);
        let timer,_self = this;
        return ()=>{
            if(!timer){
                timer = setTimeout(()=>{
                    let isVisible = checkVisible(node,100,parent);
                    if(isVisible) {
                        _self.setState({isVisible:true});
                    }
                    timer = null;
                },500);
            }            
        }
    }
    render(){
        const isVisible = this.state.isVisible;
        return (
            isVisible?this.props.children:<div style={{height:'100px'}}></div>
        )
    }
}
const style={
    textAlign:'center'
}