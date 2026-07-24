import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';
// movie/now_playing?api_key=bb170d1906866249675cdc54e946427c&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

       async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: 'bb170d1906866249675cdc54e946427c',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            //console.log(response.data.results);
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }
       loadFilmes();

    }, []);

    if(loading){
        return (
            <div className="loading">Carregando Filmes...</div>
        )
    }

    return(
        <div className="container">
            <h1>Filmes em Cartaz</h1>
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                            <Link to={`filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })};
            </div>
        </div>
    );
}
export default Home;