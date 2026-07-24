import { Link } from "react-router-dom";
import './erro.css';

function Erro() {
    return(
        <div className="not-found">
            <h2>404</h2>
            <p>Not Found!</p>
            <Link to='/'>Mostrar Filmes em Cartaz</Link>
        </div>
    );
}
export default Erro;