/**
 * Cabecera principal de la aplicación de Fórmula 1.
 * Contiene el isotipo oficial, títulos descriptivos y el selector controlado de temporadas,
 * el cual genera la serie temporal desde 2025 hasta 1950 y comunica los cambios hacia el padre mediante onTemporadaChange.
 *
 * @param {Object} props
 * @param {string} props.temporada Año de la temporada seleccionada actualmente
 * @param {(nuevaTemporada: string) => void} props.onTemporadaChange Callback invocado al seleccionar una temporada distinta
 * @returns {JSX.Element} Encabezado estructurado con selector de temporada
 */
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
