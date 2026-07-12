import axios from "axios";
//BASE DA URL: 
// https://api.themoviedb.org/3/

// URL da API:
// movie/now_playing?api_key=bb170d1906866249675cdc54e946427c&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});
export default api;