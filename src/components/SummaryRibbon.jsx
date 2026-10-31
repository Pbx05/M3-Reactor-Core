/**
 * Componente que renderiza una cinta de métricas clave derivadas de la telemetría actual.
 * Realiza cálculos directamente durante el render (líder provisional, total de victorias,
 * puntos asignados y cantidad total de clasificados) sin almacenar estado redundante.
 *
 * @param {Object} props
 * @param {Array<Object>} props.lista Lista filtrada de pilotos o constructores a evaluar
 * @param {"pilotos"|"constructores"} props.vista Tipo de clasificación visualizada
 * @param {string} props.temporada Año de la temporada en pantalla
 * @returns {JSX.Element|null} Contenedor con métricas o null si la lista carece de elementos
 */
export function SummaryRibbon({ lista, vista, temporada }) {
  if (!lista || lista.length === 0) {
    return null;
  }

  const lider = lista[0];
  const nombreLider =
    vista === "pilotos"
      ? `${lider?.Driver?.givenName ?? ""} ${lider?.Driver?.familyName ?? ""}`.trim()
      : lider?.Constructor?.name ?? "Sin datos";

  const totalVictorias = lista.reduce(
    (acc, item) => acc + Number(item.wins ?? 0),
    0
  );
  const totalPuntos = lista.reduce(
    (acc, item) => acc + Number(item.points ?? 0),
    0
  );

  return (
    <section id="summary-bar" className="summary-ribbon" aria-live="polite">
      <div className="summary-metric">
        <span className="metric-caption">{`Líder provisional · ${temporada}`}</span>
        <strong className="metric-value highlight">{nombreLider}</strong>
      </div>

      <div className="summary-metric">
        <span className="metric-caption">Carreras disputadas</span>
        <strong className="metric-value">{`${totalVictorias} Grandes Premios`}</strong>
      </div>

      <div className="summary-metric">
        <span className="metric-caption">Puntos asignados</span>
        <strong className="metric-value">
          {`${totalPuntos.toLocaleString("es-ES")} pts`}
        </strong>
      </div>

      <div className="summary-metric">
        <span className="metric-caption">Total clasificados</span>
        <strong className="metric-value">{String(lista.length)}</strong>
      </div>
    </section>
  );
}
