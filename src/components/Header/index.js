import { Link } from 'react-router-dom';
import {useHistory } from "react-router-dom";

const Header = () => {

    const history = useHistory()

    const quitSystem = () => {
        history.push('/')
        localStorage.clear();
    }

    return (
        <header>
            <nav className="navbar-navers">
                <img src={require("../../img/logo.png").default} />
                <Link onClick={() => quitSystem()}>Sair</Link>
            </nav>
        </header>
    )
}

export default Header;