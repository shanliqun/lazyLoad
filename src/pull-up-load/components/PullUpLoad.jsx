import React,{Component} from 'react';
export default class PullUpLoad extends Component{
    constructor(props){
        super(props);
        this.getClientHeight = this.getClientHeight.bind(this);
        this.getScrollHeight = this.getScrollHeight.bind(this);
        this.getScrollTop = this.getScrollTop.bind(this);
    }
    componentDidMount(){
        let parent = this.props.parent||window,offset = this.props.offset || 100;
        parent.addEventListener('scroll',(()=>{
            const _self = this; let timer;
            return ()=>{
                if(_self.getScrollTop()+_self.getClientHeight()+offset >= _self.getScrollHeight()){
                    if(!timer){
                        timer = setTimeout(()=>{
                            timer = null;
                            if(!_self.props.hasMore) return;
                            _self.props.pullUpHandler();
                        },500);
                    }
                }                
            }
        })())
    }
    componentWillUnMount(){
        
    }
    getScrollTop(){
        let parent = this.props.parent;
        if(parent) return parent.scrollTop;
        return Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    }
    getScrollHeight(){
        let parent = this.props.parent;
        if(parent) return parent.scrollHeight;
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }
    getClientHeight(){
        let parent = this.props.parent;
        if(parent) return window.getComputedStyle(parent).height;
        if(document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
        return document.body.clientHeight;
    }
    render(){
        const {hasMore, status} = this.props;
        return (
            <div className="footer">
                {hasMore?(status=='success'?'上拉加载更多':(status=='loading'?'加载中。。。':'加载失败，请重试')):'没有更多了~'}
            </div>
        )
    }
}
const style={
    textAlign:'center'
}