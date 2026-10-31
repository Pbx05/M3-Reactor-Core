/**
 * Barra de acciones, navegación por pestañas y filtrado.
 * Implementa el patrón de control unidireccional recibiendo el estado actual
 * y emitiendo eventos hacia el componente App mediante callbacks.
 *
 * @param {Object} props
 * @param {"pilotos"|"constructores"} props.vista Vista de clasificación actualmente activa
 * @param {(nuevaVista: "pilotos"|"constructores") => void} props.onVistaChange Callback para cambiar la pestaña activa
 * @param {boolean} props.soloGanadores Indica si el filtro de solo ganadores de Gran Premio está activado
 * @param {() => void} props.onToggleSoloGanadores Callback para alternar el estado del filtro de ganadores
 * @param {() => void} props.onRecargar Callback para disparar la recarga de datos de la API
 * @returns {JSX.Element} Barra de navegación y botones de acción
 */
export function ActionBar({
  vista,
  onVistaChange,
  soloGanadores,
  onToggleSoloGanadores,
  onRecargar,
}) {
  return (
    <nav className="action-bar" aria-label="Controles de clasificación">
      <div className="view-tabs" id="tabs-nav">
        <button
          type="button"
          className={`tab-button ${vista === "pilotos" ? "active" : ""}`}
          onClick={() => onVistaChange("pilotos")}
        >
          Clasificación de pilotos
        </button>
        <button
          type="button"
          className={`tab-button ${vista === "constructores" ? "active" : ""}`}
          onClick={() => onVistaChange("constructores")}
        >
          Clasificación de constructores
        </button>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          id="winners-btn"
          className={`action-button ${soloGanadores ? "active" : ""}`}
          onClick={onToggleSoloGanadores}
        >
          Solo ganadores de GP
        </button>

        <button
          type="button"
          id="reload-btn"
          className="action-button secondary"
          onClick={onRecargar}
        >
          Actualizar datos
        </button>
      </div>
    </nav>
  );
}
