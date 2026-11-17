import { useState, useEffect} from "react"
import { AuthContext } from "./authContext"


const AuthProvider =   ({children}) => {
    const[token, setToken] = useState(localStorage.getItem("token") || null)
    const [cargando, setCargando] = useState(true)

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setToken(null)
    }
    useEffect(() => {   
        const verificarToken = async () => {
            const tokenGuardado = localStorage.getItem("tokenGuardado")
            if (!tokenGuardado) {
                setCargando(false)
                return
            }
            try {
                const respuesta = await fetch("http://localhost:3000/usuarios/verificar-token", {
                    headers: {
                        Authorization: `Bearer ${tokenGuardado}` //BEARER es el tipo de token que se está utilizando, en este caso JWT
                    }
                })
                if (!respuesta.ok) {
                    throw new Error("Token inválido")   

                } 
                setToken(tokenGuardado)
            }   
                catch (error) {
                    console.error("Error al verificar token", error)    

                    cerrarSesion()
                } finally {
                    setCargando(false)
                }
            }
                verificarToken()
    }, []) 
               
    
        return (
            <AuthContext.Provider
             value={{token, setToken, cargando, cerrarSesion}}>
                {children}
            </AuthContext.Provider>
        )
    
}

 
 export default {AuthProvider}