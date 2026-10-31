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

export function App() {
  // 1. Estado mínimo esencial (useState con lazy initializer para localStorage)
  const [temporada, setTemporada] = useState(
    () => localStorage.getItem("f1_temporada") ?? "2024"
  );
  const [vista, setVista] = useState(
    () => localStorage.getItem("f1_vista") ?? "pilotos"
  );
  const [soloGanadores, setSoloGanadores] = useState(false);

  // 2. Estado asíncrono para los datos de telemetría de la API
  const [pilotos, setPilotos] = useState([]);
  const [constructores, setConstructores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargarKey, setRecargarKey] = useState(0);

  // 3. Manejadores de eventos (Lifting State Up y flujo unidireccional)
  function manejarCambioTemporada(nuevaTemporada) {
    setTemporada(nuevaTemporada);
    localStorage.setItem("f1_temporada", nuevaTemporada);
    setCargando(true);
    setError(null);
  }

  function manejarCambioVista(nuevaVista) {
    setVista(nuevaVista);
    localStorage.setItem("f1_vista", nuevaVista);
  }

  function manejarToggleGanadores() {
    setSoloGanadores((prev) => !prev);
  }

  function manejarRecargar() {
    setCargando(true);
    setError(null);
    setRecargarKey((prev) => prev + 1);
  }

  // 4. Único useEffect con función de limpieza y AbortController para sincronización con la API
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
        if (err.name === "AbortError") return;
        if (activo) {
          setError(err.message || "Error al obtener la telemetría");
          setCargando(false);
        }
      });

    // Función de limpieza para abortar peticiones previas y evitar fugas de memoria
    return () => {
      activo = false;
      controller.abort();
    };
  }, [temporada, recargarKey]);

  // 5. Valores derivados calculados al vuelo en el render (sin estados redundantes)
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
