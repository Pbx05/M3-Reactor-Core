import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { ActionBar } from "./components/ActionBar.jsx";
import { Footer } from "./components/Footer.jsx";

export function App() {
  const [temporada, setTemporada] = useState("2024");
  const [vista, setVista] = useState("pilotos");
  const [soloGanadores, setSoloGanadores] = useState(false);

  return (
    <>
      <Header
        temporada={temporada}
        onTemporadaChange={setTemporada}
      />

      <main className="main-wrapper">
        <ActionBar
          vista={vista}
          onVistaChange={setVista}
          soloGanadores={soloGanadores}
          onToggleSoloGanadores={() => setSoloGanadores((prev) => !prev)}
          onRecargar={() => {}}
        />

        <section id="app" className="standings-display" aria-live="polite">
          {/* Los componentes de estado, métricas y tablas se integrarán en las partes 3, 4 y 5 */}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
