 import { useEffect, useState } from "react";
 import { useParams, useNavigate} from "react-router-dom";
 import api from '../../services/api';
 import './filme-info.css';
 import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme(){
            await api.get(`movie/${id}`,{
                params:{
                    api_key: 'bb170d1906866249675cdc54e946427c',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                //console.log('FILME NÃO ENCONTRADO.');
                navigate("/", { replace: true }) //redireciona p/ home.
                return;
            })
        }
        loadFilme();

        return() => {
            console.log('O componente foi desmontado')
        }
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeFlix");

     // verificar se minha lista existe..senão inicio com array vazio.
        let filmesSalvos = JSON.parse(minhaLista) || [];

     //verificar se já tem o filme na lista que o usuário está querendo salvar.    
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id );
        if(hasFilme){
            toast.warn("Esse filme já está na sua lista.");
            return;
        }
     // adicionando filme na lista.
        filmesSalvos.push(filme)
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if(loading){
            return(
                <div className="filme-info">
                    <h1>Carregando detalhes...</h1>         
                </div>
            )
        }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação {Number(filme.vote_average).toFixed(1)} de 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );
}
export default Filme;