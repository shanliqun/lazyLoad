import React,{Component} from 'react';
import { renderRoutes } from 'react-router-config';

class App extends Component{
    constructor(props){
        super(props);
        this.wxcallback=[];
        this.count = 0;
    }

    componentDidMount(){
    }
    componentWillMount(){
    }
    componentDidUpdate(){
        
    }
    render(){
        return(
            <div className="container">
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}

export default App;