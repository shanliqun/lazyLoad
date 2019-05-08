import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchData} from '../actions';
import PullUpLoad from '../components/PullUpLoad';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

require('../static/global.css');

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {pageNum:1};
    }
    componentWillMount() {
    }
    static getDerivedStateFromProps(nextprops,prevState){
        if(nextprops.data.pageNum!==prevState.pageNum) return {pageNum:nextprops.data.pageNum}
    }

    static fillData(store,req,pageNum) {
        return store.dispatch(fetchData(pageNum));
    }
    componentDidMount(){
        if(!this.props.data.list.length){
            IndexPage.fillData(this.context.store,this.props,1);
        }
    }
    componentWillReceiveProps(nextProps) {
        
    }

    componentDidUpdate() {
        
    }
    shouldComponentUpdate(nextprops, nextstate) {
        debugger;
        return true;
    }
    render() {
        const {list, status, hasMore} = this.props.data;
        return (
            <div className="indexpage">
                {list.length?list.map(()=>{
                    return <img src={require('../static/images/pic.jpg')} style={{display:'block',width:'100%',height:'100px'}}  />
                }):''}
                <PullUpLoad status={status} hasMore = {hasMore} pullUpHandler={()=>{
                        this.props.loadNewsAction(this.state.pageNum)
                    }} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {reducer} = state;
    return {data:reducer.data};
}
IndexPage.contextTypes = {
    store: PropTypes.object
};
function mapDispatchToProps(dispatch) {
    return {
        loadNewsAction: bindActionCreators(fetchData, dispatch)
    }
}
function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(IndexPage);