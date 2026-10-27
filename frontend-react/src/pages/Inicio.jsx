import { Link } from "react-router-dom"

export default function Inicio(){
    return (
        <section className="inicio-card">
            <span className="section-eyebrow">Bienvenida</span>
            <h1>Sistema de Gestión Académica</h1>
            <p>
                Bienvenido/a al sistema. Desde el menú podés acceder
                a las secciones disponibles.
            </p>
            <div className="inicio-accesos">
                <Link to="/alumnos">Gestión de alumnos</Link>
                <Link to="/docentes">Gestión de docentes</Link>
            </div>
        </section>
    )
}