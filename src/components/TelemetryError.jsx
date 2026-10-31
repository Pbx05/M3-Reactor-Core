/**
 * Componente visual de estado de error en la comunicación con la API.
 * Notifica al usuario de interrupciones en la recepción de datos y expone el mensaje de fallo capturado.
 *
 * @param {Object} props
 * @param {string} props.mensaje Detalle o descripción textual del error ocurrido
 * @returns {JSX.Element} Contenedor con aviso de sistema y mensaje de error
 */
export function TelemetryError({ mensaje }) {
  return (
    <div className="telemetry-state error">
      <div className="error-badge">Aviso del sistema</div>
      <h2 className="state-title">Interrupción en la recepción de datos</h2>
      <p className="state-message">{String(mensaje)}</p>
    </div>
  );
}
