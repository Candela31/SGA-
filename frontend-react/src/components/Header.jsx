import { Link } from "react-router-dom";
import SelectorTema from "./SelectorTema";

export default function Header() {
    return (
        <header className="site-header">
            <Link className="site-brand" to="/" aria-label="SGA, ir al inicio">
                <img src="/sga-marca.svg" alt="" />
                <span className="site-brand-copy">
                    <strong>SGA</strong>
                    <span>Sistema de Gestión Académica</span>
                </span>
            </Link>
            <nav className="site-nav" aria-label="Navegación principal">
                <Link to="/">Inicio</Link>
                <Link to="/alumnos">Alumnos</Link>
                <Link to="/docentes">Docentes</Link>
                <Link to="/ayuda">Ayuda</Link>
            </nav>
        <SelectorTema />
        </header>
    )
}