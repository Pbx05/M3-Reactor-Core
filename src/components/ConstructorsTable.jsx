export function ConstructorsTable({ constructores }) {
  if (constructores.length === 0) {
    return (
      <div className="telemetry-state empty">
        <p className="state-message">
          No hay registros de constructores disponibles para este año (el
          Mundial de Constructores se inició en 1958).
        </p>
      </div>
    );
  }

  return (
    <div className="timing-board-container">
      <table className="f1-timing-table">
        <thead>
          <tr>
            <th className="col-pos">Pos</th>
            <th className="col-team-name">Constructor / Escudería</th>
            <th className="col-nat">Sede</th>
            <th className="col-wins center">Victorias</th>
            <th className="col-points right">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {constructores.map((item) => {
            const { position, points, wins, Constructor } = item;
            const nombre = Constructor?.name ?? "Desconocido";
            const nacionalidad = Constructor?.nationality ?? "—";
            const posNum = Number(position);
            const podioClase =
              posNum <= 3 ? `podium-rank p-${posNum}` : "standard-rank";

            return (
              <tr
                key={Constructor?.constructorId ?? position}
                className="constructor-row"
              >
                <td className="col-pos">
                  <span className={`pos-indicator ${podioClase}`}>
                    {position ?? ""}
                  </span>
                </td>
                <td className="col-team-name">
                  <strong className="constructor-name">{nombre}</strong>
                </td>
                <td className="col-nat">
                  <span className="nationality-text">{nacionalidad}</span>
                </td>
                <td className="col-wins center">
                  <span
                    className={`metric-figure ${Number(wins) > 0 ? "has-wins" : ""}`}
                  >
                    {wins ?? "0"}
                  </span>
                </td>
                <td className="col-points right">
                  <span className="points-figure">{points ?? "0"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
