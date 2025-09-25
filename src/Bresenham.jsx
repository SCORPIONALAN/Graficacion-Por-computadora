import React, { useState } from "react";
import "./bresenham.css";
import { AccordionItem } from "./components/AccordionItem.jsx";
import {
  bresenhamLinea,
  bresenhamCircunferencia,
} from "./calculos/algoritmos.js";

// ---- Grid Dinamico ---- //
function Grid({ puntos = [], inicio, fin, radio, showCenter = false }) {
  // Convertir puntos a Set para búsqueda rápida
  const puntosSet = new Set(
    puntos
      .filter((p) => p && p.x !== undefined && p.y !== undefined)
      .map((p) => `${p.x},${p.y}`)
  );

  // Limites por defecto
  let minX = -10,
    maxX = 10,
    minY = -10,
    maxY = 10;

  // Ajustar límites si hay línea
  if (inicio && fin) {
    minX = Math.min(inicio.x, fin.x) - 5;
    maxX = Math.max(inicio.x, fin.x) + 5;
    minY = Math.min(inicio.y, fin.y) - 5;
    maxY = Math.max(inicio.y, fin.y) + 5;
  }

  // Ajustar límites si hay circunferencia
  if (radio) {
    minX = -radio - 5;
    maxX = radio + 5;
    minY = -radio - 5;
    maxY = radio + 5;
  }

  // Asegurarse que inicio y fin siempre sean objetos
  inicio = inicio || {};
  fin = fin || {};

  const cells = [];

  for (let row = maxY; row >= minY; row--) {
    let fila = [];
    for (let col = minX; col <= maxX; col++) {
      let color = puntosSet.has(`${col},${row}`) ? "cell active" : "cell";

      if (inicio.x === col && inicio.y === row) color = "cell start";
      if (fin.x === col && fin.y === row) color = "cell end";
      if (showCenter && col === 0 && row === 0) color = "cell center";

      fila.push(<div key={col} className={color}></div>);
    }
    cells.push(
      <div key={row} className="row">
        {fila}
      </div>
    );
  }

  return <div className="grid">{cells}</div>;
}

// ---- Componente principal ---- //
export default function BresenhamDemo() {
  const [lineaInputs, setLineaInputs] = useState({
    x1: 0,
    y1: 0,
    x2: 5,
    y2: 5,
  }); // Un ejemplo inicial

  const [lineaPuntos, setLineaPuntos] = useState([]);
  const [animLinea, setAnimLinea] = useState([]);
  const [lineaGenerada, setLineaGenerada] = useState(false);

  const [radio, setRadio] = useState(5);
  const [circPuntos, setCircPuntos] = useState([]);
  const [animCirc, setAnimCirc] = useState([]);
  const [circGenerada, setCircGenerada] = useState(false);

  // ---- Línea ---- //
  const generarLinea = () => {
    const { x1, y1, x2, y2 } = lineaInputs;
    let lp = bresenhamLinea(Number(x1), Number(y1), Number(x2), Number(y2));
    setLineaPuntos(lp);
    setAnimLinea([]);
    setLineaGenerada(true);

    let i = 0;
    const interval = setInterval(() => {
      if (i < lp.length) {
        setAnimLinea((prev) => [...prev, lp[i]]);
        i++;
      } else clearInterval(interval);
    }, 50);
  };

  const borrarLinea = () => {
    setLineaPuntos([]);
    setAnimLinea([]);
    setLineaGenerada(false);
  };

  // ---- Circunferencia ---- //
  const generarCirc = () => {
    const r = Number(radio);
    if (!Number.isInteger(r) || r < 1) {
      alert("El radio debe ser un entero positivo.");
      return;
    }
    let cp = bresenhamCircunferencia(r);
    setCircPuntos(cp);
    setAnimCirc([]);
    setCircGenerada(true);

    let j = 0;
    const interval = setInterval(() => {
      if (j < cp.length) {
        setAnimCirc((prev) => [...prev, cp[j]]);
        j++;
      } else clearInterval(interval);
    }, 30);
  };

  const borrarCirc = () => {
    setCircPuntos([]);
    setAnimCirc([]);
    setCircGenerada(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="bresenham-title">Algoritmos de Bresenham</h1>
      <h2 className="bresenham-subtitle">
        Implementación de los algoritmos de Bresenham en Web
      </h2>
      <p className="bresenham-team-label">Integrantes del equipo</p>
      <ul className="bresenham-team-list">
        <li>Miguel Axel Fuster Barba</li>
        <li>Leonardo Garcia Miccete</li>
        <li>Torres Mora Alan Giovanni</li>
      </ul>
      {/* Línea */}
      <AccordionItem title="Línea (Bresenham)">
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              flexWrap: "wrap",
            }}
          >
            {["x1", "y1", "x2", "y2"].map((key) => (
              <label key={key}>
                {key.toUpperCase()}:{" "}
                <input
                  type="number"
                  value={lineaInputs[key]}
                  onChange={(e) =>
                    setLineaInputs({
                      ...lineaInputs,
                      [key]: Number(e.target.value),
                    })
                  }
                  style={{ width: "60px", marginLeft: "5px" }}
                />
              </label>
            ))}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={generarLinea}
              disabled={lineaGenerada}
              style={{
                padding: "8px 16px",
                backgroundColor: lineaGenerada ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: lineaGenerada ? "not-allowed" : "pointer",
              }}
            >
              Generar Línea
            </button>
            {lineaGenerada && (
              <button
                onClick={borrarLinea}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Borrar Línea
              </button>
            )}
          </div>
        </div>

        {lineaPuntos.length > 0 && (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <table style={{ borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>p_k</th>
                  </tr>
                </thead>
                <tbody>
                  {lineaPuntos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.x}</td>
                      <td>{p.y}</td>
                      <td>{p.pk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Grid
              puntos={animLinea}
              inicio={{ x: lineaInputs.x1, y: lineaInputs.y1 }}
              fin={{ x: lineaInputs.x2, y: lineaInputs.y2 }}
              showCenter={false}
            />
          </div>
        )}
      </AccordionItem>

      {/* Circunferencia */}
      <AccordionItem title="Circunferencia (Bresenham)">
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <label>
              Radio:{" "}
              <input
                type="number"
                value={radio}
                onChange={(e) => setRadio(Number(e.target.value))}
                style={{ width: "60px", marginLeft: "5px" }}
              />
            </label>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={generarCirc}
              disabled={circGenerada}
              style={{
                padding: "8px 16px",
                backgroundColor: circGenerada ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: circGenerada ? "not-allowed" : "pointer",
              }}
            >
              Generar Circunferencia
            </button>
            {circGenerada && (
              <button
                onClick={borrarCirc}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Borrar Circunferencia
              </button>
            )}
          </div>
        </div>

        {circPuntos.length > 0 && (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <table style={{ borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>p_k</th>
                  </tr>
                </thead>
                <tbody>
                  {circPuntos.map((p, i) => (
                    <tr key={i}>
                      <td>{p.x}</td>
                      <td>{p.y}</td>
                      <td>{p.pk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Grid puntos={animCirc} radio={radio} showCenter={true} />
          </div>
        )}
      </AccordionItem>
    </div>
  );
}
