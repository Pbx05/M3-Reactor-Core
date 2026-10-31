/**
 * Componente visual de estado de carga asíncrona.
 * Informa al usuario que la telemetría de la temporada indicada se encuentra sincronizándose.
 *
 * @param {Object} props
 * @param {string} props.temporada Año de la temporada cuyos datos están siendo solicitados
 * @returns {JSX.Element} Contenedor con barra de escaneo animada y mensaje
 */
export function TelemetryLoading({ temporada }) {
  return (
    <div className="telemetry-state loading">
      <div className="telemetry-scan-bar" aria-hidden="true" />
      <p className="state-message">
        Sincronizando telemetría de la temporada {temporada}
      </p>
    </div>
  );
}
