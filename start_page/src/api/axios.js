import axios from 'axios';

/**
 * Module Name: axios.js
 * Date of Creation: 28/08/2022
 * Creator: Hao Xu
 * Summary: A hook thats easier for people to connect to backend server.
 * Variable Accessed: 
 */
export default axios.create({
    baseURL: 'http://localhost:8080'
});