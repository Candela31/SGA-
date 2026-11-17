import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
const RutaProtegida = () => {
    const { token, cargando } = useAuth();
    if (cargando) {
        return <div>verificar sesion...</div>
    }

    if(!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet /> 
}

    export default RutaProtegida;