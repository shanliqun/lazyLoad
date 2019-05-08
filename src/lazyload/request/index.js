import axios from 'axios';
export async function fetchData(username){
        let json;
        try{
            json = (await axios.get(`https://api.github.com/users/${username||1}`)).data;
        }catch(e){
            console.log(e);
            // dispatch({type:ERROR});
        }
        return json;
}
