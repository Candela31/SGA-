import { AppBar, Box, Container, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material"
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded"
import { Link as RouterLink, NavLink } from "react-router-dom"
import SelectorTema from "./SelectorTema";
import "../index.css"
import "../styles/formulario.css"

export default function Header() {
    return (
        <AppBar
            component="header"
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: { xs: 76, sm: 88 },
                        py: { xs: 1, sm: 1.5 },
                        gap: { xs: 1, sm: 3 },
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/"
                        aria-label="SGA, ir al inicio"
                        underline="none"
                        sx={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
                    >
                        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                            <Box
                                component="img"
                                src="/sga-marca.svg"
                                alt="Identidad visual de SGA"
                                sx={{
                                    display: "block",
                                    width: { xs: 40, sm: 50 },
                                    height: { xs: 40, sm: 50 },
                                    objectFit: "contain"
                                }}
                            />
                            <Box>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                                    SGA
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Gestión Académica
                                </Typography>
                            </Box>
                        </Stack>
                    </Link>

                    <Stack
                        component="nav"
                        className="site-navigation"
                        aria-label="Navegación principal"
                        direction="row"
                        sx={{
                            display: { xs: "grid", sm: "flex" },
                            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "none" },
                            alignItems: "center",
                            justifyContent: { xs: "stretch", sm: "flex-end" },
                            gap: { xs: 0.25, sm: 1.5 },
                            flexWrap: "wrap",
                            flex: { xs: "1 1 100%", sm: "0 1 auto" },
                            width: { xs: "100%", sm: "auto" },
                            order: { xs: 2, sm: 0 }
                        }}
                    >
                        <Link
                            component={NavLink}
                            to="/"
                            end
                            color="text.primary"
                            underline="none"
                            sx={{
                                px: { xs: 1, sm: 1.5 },
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                transition: "background-color 160ms ease, color 160ms ease",
                                "&:hover": { bgcolor: "action.hover" },
                                "&.active": { bgcolor: "action.selected", color: "primary.main" }
                            }}
                        >
                            Inicio
                        </Link>
                        <Link
                            component={NavLink}
                            to="/alumnos"
                            color="text.primary"
                            underline="none"
                            sx={{
                                px: { xs: 1, sm: 1.5 },
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                transition: "background-color 160ms ease, color 160ms ease",
                                "&:hover": { bgcolor: "action.hover" },
                                "&.active": { bgcolor: "action.selected", color: "primary.main" }
                            }}
                        >
                            Alumnos
                        </Link>
                        <Link
                            component={NavLink}
                            to="/docentes"
                            color="text.primary"
                            underline="none"
                            sx={{
                                px: { xs: 1, sm: 1.5 },
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                transition: "background-color 160ms ease, color 160ms ease",
                                "&:hover": { bgcolor: "action.hover" },
                                "&.active": { bgcolor: "action.selected", color: "primary.main" }
                            }}
                        >
                            Docentes
                        </Link>
                        <Link
                            component={NavLink}
                            to="/materias"
                            color="text.primary"
                            underline="none"
                            sx={{
                                px: { xs: 1, sm: 1.5 },
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                transition: "background-color 160ms ease, color 160ms ease",
                                "&:hover": { bgcolor: "action.hover" },
                                "&.active": { bgcolor: "action.selected", color: "primary.main" }
                            }}
                        >
                            Materias
                        </Link>
                        <IconButton
                            component={RouterLink}
                            to="/ayuda"
                            aria-label="Ayuda"
                            color="primary"
                            sx={{ mx: 0.25 }}
                        >
                            <HelpOutlineRoundedIcon />
                        </IconButton>
                        <SelectorTema />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}