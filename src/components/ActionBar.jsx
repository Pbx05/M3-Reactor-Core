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
