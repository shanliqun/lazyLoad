export function fetchData(pageNum){
    return async (dispatch)=>{
        dispatch({type:'start'});
        try{
            setTimeout(function(){
                if(pageNum <= 5) {
                    dispatch({type:'success',data:{hasMore:true,list:[1,2,3,4,5,6,7,8,9,0]}});
                }else{
                    dispatch({type:'success',data:{hasMore:false}});
                }
            },500);            
        }catch(e){
            dispatch({type:'error'});
        }
    }
}
