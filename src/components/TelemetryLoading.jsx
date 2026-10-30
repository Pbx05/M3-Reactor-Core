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
