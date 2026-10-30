export function DriversTable({ pilotos }) {
  if (pilotos.length === 0) {
    return (
      <div className="telemetry-state empty">
        <p className="state-message">
          No se registran pilotos para el criterio seleccionado.
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
            <th className="col-num">N°</th>
            <th className="col-driver">Piloto</th>
            <th className="col-team">Escudería</th>
            <th className="col-nat">Nacionalidad</th>
            <th className="col-wins center">Victorias</th>
            <th className="col-points right">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {pilotos.map((item) => {
            const { position, points, wins, Driver, Constructors } = item;
            const dadoNombre = Driver?.givenName ?? "";
            const apellido = Driver?.familyName ?? "";
            const codigo = Driver?.code ?? apellido.slice(0, 3).toUpperCase();
            const numero = Driver?.permanentNumber ?? "—";
            const nacionalidad = Driver?.nationality ?? "—";
            const escuderia = Constructors?.[0]?.name ?? "Independiente";

            const posNum = Number(position);
            const podioClase =
              posNum <= 3 ? `podium-rank p-${posNum}` : "standard-rank";

            return (
              <tr key={Driver?.driverId ?? position} className="driver-row">
                <td className="col-pos">
                  <span className={`pos-indicator ${podioClase}`}>
                    {position ?? ""}
                  </span>
                </td>
                <td className="col-num">
                  <span className="racing-num">{numero}</span>
                </td>
                <td className="col-driver">
                  <div className="driver-meta">
                    <span className="driver-code">{codigo}</span>
                    <span className="driver-fullname">
                      {dadoNombre ? `${dadoNombre} ` : ""}
                      <strong>{apellido}</strong>
                    </span>
                  </div>
                </td>
                <td className="col-team">
                  <span className="team-tag">{escuderia}</span>
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
