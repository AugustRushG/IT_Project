import useAuth from './useAuth';
import axios from '../api/axios';

/**
 * Module Name: useRefresh.js
 * Date of Creation: 15/09/2022
 * Creator: Hao Xu
 * Summary: A custome userHook to check the access token of user is still valid. If so, set auth username and accesstoken.
 * Variable Accessed: 
 */

const CHECKURL='/api/users/checkToken'

const useRefresh = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(CHECKURL,{headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}}
            
        );
        console.log(response);
        setAuth(prev => {
            return {
                user:JSON.parse(localStorage.getItem('user')),
                accessToken:JSON.parse(localStorage.getItem('accessToken'))
            }
        });
        return JSON.parse(localStorage.getItem('accessToken'));
    }
    return refresh;
}

export default useRefresh;