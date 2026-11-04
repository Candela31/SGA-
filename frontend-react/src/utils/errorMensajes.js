export function obtenerMensajeError(error, fallback = "No se pudo conectar con el servidor.") {
  const mensajesNativos = new Set([
    "Failed to fetch",
    "NetworkError when attempting to fetch resource.",
    "fetch failed"
  ])

  if (typeof error === "string" && error.trim()) {
    return error.trim()
  }

  const mensaje = error instanceof Error ? error.message : String(error ?? "")

  if (!mensaje) {
    return fallback
  }

  return mensajesNativos.has(mensaje) ? fallback : mensaje
}
