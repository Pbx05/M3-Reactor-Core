import { useState, useEffect } from "react";
import { cargarDatosTemporada } from "./api.js";
import { Header } from "./components/Header.jsx";
import { ActionBar } from "./components/ActionBar.jsx";
import { SummaryRibbon } from "./components/SummaryRibbon.jsx";
import { DriversTable } from "./components/DriversTable.jsx";
import { ConstructorsTable } from "./components/ConstructorsTable.jsx";
import { TelemetryLoading } from "./components/TelemetryLoading.jsx";
import { TelemetryError } from "./components/TelemetryError.jsx";
import { Footer } from "./components/Footer.jsx";

/**
 * Componente principal de la aplicación.
 * Gestiona el estado global (temporada seleccionada, vista activa, filtros y telemetría de la API),
 * orquesta la sincronización asíncrona mediante un único useEffect con limpieza
 * y distribuye datos y callbacks hacia los componentes hijos (flujo unidireccional).
 *
 * @returns {JSX.Element} Árbol de componentes de la aplicación
 */
export function App() {
  // 1. Estado mínimo esencial (useState con lazy initializer para consultar localStorage solo en el montaje inicial)
  const [temporada, setTemporada] = useState(
    () => localStorage.getItem("f1_temporada") ?? "2024"
  );
  const [vista, setVista] = useState(
    () => localStorage.getItem("f1_vista") ?? "pilotos"
  );
  const [soloGanadores, setSoloGanadores] = useState(false);

  // 2. Estado asíncrono para los datos de telemetría devueltos por la API Jolpi Ergast
  const [pilotos, setPilotos] = useState([]);
  const [constructores, setConstructores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarKey, setRecargarKey] = useState(0);

  // 3. Manejadores de eventos (Lifting State Up y flujo de datos unidireccional)

  /**
   * Actualiza la temporada en el estado y persiste la selección en localStorage,
   * reseteando de forma reactiva los indicadores de carga y error para la nueva petición.
   * @param {string} nuevaTemporada Año de la temporada seleccionada (ej. "2024")
   */
  function manejarCambioTemporada(nuevaTemporada) {
    setTemporada(nuevaTemporada);
    localStorage.setItem("f1_temporada", nuevaTemporada);
    setCargando(true);
    setError(null);
  }

  /**
   * Cambia la pestaña de visualización activa ("pilotos" o "constructores")
   * y guarda la preferencia del usuario en el almacenamiento local.
   * @param {"pilotos"|"constructores"} nuevaVista Identificador de la vista seleccionada
   */
  function manejarCambioVista(nuevaVista) {
    setVista(nuevaVista);
    localStorage.setItem("f1_vista", nuevaVista);
  }

  /**
   * Alterna el filtro de "Solo ganadores de GP".
   * Emplea una función actualizadora (callback) para calcular el nuevo estado a partir del valor previo de forma segura.
   */
  function manejarToggleGanadores() {
    setSoloGanadores((prev) => !prev);
  }

  /**
   * Solicita una recarga manual de los datos de la temporada en curso.
   * Activa el estado de carga y genera un nuevo valor en recargarKey para disparar el useEffect.
   */
  function manejarRecargar() {
    setCargando(true);
    setError(null);
    setRecargarKey((prev) => prev + 1);
  }

  // 4. Único useEffect justificado: sincronización con la API externa al cambiar la temporada o pulsar recargar
  useEffect(() => {
    let activo = true;
    const controller = new AbortController();

    cargarDatosTemporada(temporada, controller.signal)
      .then((datos) => {
        if (activo) {
          setPilotos(datos.pilotos);
          setConstructores(datos.constructores);
          setCargando(false);
        }
      })
      .catch((err) => {
        // Ignorar si la cancelación fue provocada intencionadamente por el desmontaje o cambio de temporada
        if (err.name === "AbortError") return;
        if (activo) {
          setError(err.message || "Error al obtener la telemetría");
          setCargando(false);
        }
      });

    // Función de limpieza: cancela la petición HTTP en curso y evita mutaciones en componentes desmontados
    return () => {
      activo = false;
      controller.abort();
    };
  }, [temporada, recargarKey]);

  // 5. Valores derivados calculados durante el render (evita redundancia y sincronizaciones innecesarias de estado)
  const pilotosFiltrados = soloGanadores
    ? pilotos.filter((item) => Number(item.wins ?? 0) > 0)
    : pilotos;

  const constructoresFiltrados = soloGanadores
    ? constructores.filter((item) => Number(item.wins ?? 0) > 0)
    : constructores;

  const listaActual =
    vista === "pilotos" ? pilotosFiltrados : constructoresFiltrados;

  return (
    <>
      <Header
        temporada={temporada}
        onTemporadaChange={manejarCambioTemporada}
      />

      <main className="main-wrapper">
        <ActionBar
          vista={vista}
          onVistaChange={manejarCambioVista}
          soloGanadores={soloGanadores}
          onToggleSoloGanadores={manejarToggleGanadores}
          onRecargar={manejarRecargar}
        />

        {!cargando && !error && (
          <SummaryRibbon
            lista={listaActual}
            vista={vista}
            temporada={temporada}
          />
        )}

        <section id="app" className="standings-display" aria-live="polite">
          {cargando ? (
            <TelemetryLoading temporada={temporada} />
          ) : error ? (
            <TelemetryError mensaje={error} />
          ) : vista === "pilotos" ? (
            <DriversTable pilotos={pilotosFiltrados} />
          ) : (
            <ConstructorsTable constructores={constructoresFiltrados} />
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
