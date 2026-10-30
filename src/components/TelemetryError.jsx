export function TelemetryError({ mensaje }) {
  return (
    <div className="telemetry-state error">
      <div className="error-badge">Aviso del sistema</div>
      <h2 className="state-title">Interrupción en la recepción de datos</h2>
      <p className="state-message">{String(mensaje)}</p>
    </div>
  );
}
