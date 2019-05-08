import React,{Component} from 'react';
import { renderRoutes } from 'react-router-config';
class App extends Component{
    constructor(props){
        super(props);
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