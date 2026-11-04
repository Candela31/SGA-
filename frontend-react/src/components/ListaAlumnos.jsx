import { useEffect, useState } from "react"
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
const API_ALUMNOS = "http://localhost:3000/alumnos"

export function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")
        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, 
                { method: "DELETE" }
            )
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo elimnar alumno")
        }
    }
    useEffect(() => {
        async function cargarAlumnos(){
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_ALUMNOS)

            if (!respuesta.ok){
                throw new Error("No se pudo obtener la lista", respuesta.status)
            }

            const datos = await respuesta.json()
            setAlumnos(datos)
        } catch(error) {
            console.error("Error de conexión", error)
            setError("No se pudo cargar la lista de alumnos.")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar])

    if (cargando) {
        return (
            <Paper component="section" elevation={0} sx={{ p: 3, border: 1, borderColor: "divider", borderRadius: 4 }}>
                <Typography color="text.secondary">Cargando alumnos...</Typography>
            </Paper>
        )
    }
    if (error) {
        return <Alert severity="error" role="alert">{error}</Alert>
    }
    return (
        <Paper
            component="section"
            elevation={0}
            sx={{
                p: { xs: 2.25, sm: 3.5 },
                border: 1,
                borderColor: "divider",
                borderRadius: { xs: 3, sm: 4 },
                bgcolor: "background.paper",
                boxShadow: "0 14px 36px rgba(34, 42, 51, 0.06)"
            }}
        >
            <Typography
                component="h2"
                variant="h5"
                sx={{
                    mb: 2.5,
                    fontWeight: 750,
                    letterSpacing: "-0.035em",
                    fontSize: { xs: "1.35rem", sm: "1.55rem" }
                }}
            >
                Alumnos
            </Typography>
            {alumnos.length === 0
                ? (
                    <Typography color="text.secondary">
                        No hay alumnos registrados.
                    </Typography>
                )
                : (
                    <Stack
                        component="ul"
                        spacing={1.5}
                        sx={{ listStyle: "none", p: 0, m: 0 }}
                    >
                        {alumnos.map(alumno => (
                            <Paper
                                component="li"
                                key={alumno.legajo}
                                elevation={0}
                                sx={{
                                    p: { xs: 1.75, sm: 2.25 },
                                    border: 1,
                                    borderColor: "divider",
                                    borderRadius: { xs: 2.5, sm: 3 },
                                    display: "flex",
                                    alignItems: { xs: "stretch", sm: "center" },
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 2,
                                    transition: "border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        transform: { xs: "none", sm: "translateY(-1px)" },
                                        boxShadow: "0 8px 20px rgba(34, 42, 51, 0.07)"
                                    }
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{ alignItems: "center", flexWrap: "wrap", minWidth: 0 }}
                                >
                                    <Chip label={`Legajo ${alumno.legajo}`} color="primary" variant="outlined" size="small" />
                                    <Box>
                                        <Typography fontWeight={700} sx={{ overflowWrap: "anywhere" }}>{alumno.nombre}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {alumno.carrera}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}>
                                    <Button
                                        type="button"
                                        onClick={() => onEditarAlumno(alumno)}
                                        variant="outlined"
                                        size="small"
                                        sx={{ minHeight: 40, px: 1.75, borderRadius: 2, textTransform: "none", fontWeight: 650 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => eliminarAlumno(alumno.legajo)}
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        sx={{ minHeight: 40, px: 1.75, borderRadius: 2, textTransform: "none", fontWeight: 650 }}
                                    >
                                        Eliminar
                                    </Button>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
        </Paper>
    )
}