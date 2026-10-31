/**
 * Pie de página institucional de la aplicación.
 * Muestra información sobre la procedencia de los datos (API Jolpi Ergast F1) y contexto académico.
 *
 * @returns {JSX.Element} Elemento footer con créditos y atribución
 */
export function Footer() {
  return (
    <footer className="f1-footer">
      <div className="footer-inner">
        <p>
          Datos en tiempo real servidos a través de la API oficial Jolpi Ergast F1.
        </p>
        <p>Programación Web I · Cliente · React + Vite</p>
      </div>
    </footer>
  );
}
