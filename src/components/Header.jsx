export function Header({ temporada, onTemporadaChange }) {
  const anioActual = 2025;
  const temporadas = Array.from({ length: 76 }, (_, i) => String(anioActual - i));

  return (
    <header className="f1-header">
      <div className="header-inner">
        <div className="brand">
          <span className="f1-logo">F1</span>
          <div className="brand-text">
            <h1>Campeonato Mundial de Fórmula 1</h1>
            <p>Clasificación y telemetría de la temporada</p>
          </div>
        </div>

        <div className="season-control">
          <label htmlFor="season-select">Temporada</label>
          <div className="select-wrapper">
            <select
              id="season-select"
              aria-label="Seleccionar temporada de Fórmula 1"
              value={temporada}
              onChange={(e) => onTemporadaChange(e.target.value)}
            >
              {temporadas.map((anio) => (
                <option key={anio} value={anio}>
                  Temporada {anio}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
