# Algoritmos de Bresenham – Implementación Web (React + Vite)

Este proyecto implementa los algoritmos de **Bresenham para líneas y circunferencias** en una aplicación web desarrollada con **React** y **Vite**.  
Permite ingresar los parámetros de entrada (puntos inicial/final para líneas y radio para circunferencias), visualizar en una tabla los puntos generados con sus valores de decisión `p_k` y graficarlos dinámicamente en una grilla.

---

## 📋 Características principales

- Selección entre **línea** o **circunferencia** para graficar.
- **Entrada de parámetros**:
  - Para líneas: punto inicial (x1, y1) y punto final (x2, y2).
  - Para circunferencia: radio (entero positivo).
- **Tabla de resultados**:
  - Muestra para cada punto calculado sus coordenadas (X, Y) y el valor de decisión `p_k`.
- **Gráfica en grilla**:
  - Visualización animada de los puntos generados en una cuadrícula interactiva.
- Proyecto desarrollado en **React + Vite** para rápida ejecución en cualquier entorno con Node.js.

---

## ⚙️ Instalación y ejecución

1. Clonar este repositorio o copiar los archivos del proyecto.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir la URL indicada en la terminal (por defecto `http://localhost:5173`).

---

## 🧠 Algoritmos principales

### 1️⃣ Función `bresenhamLinea(x0, y0, x1, y1)`

Implementa el **algoritmo de Bresenham para líneas**, que determina los píxeles (o puntos) que mejor aproximan una línea recta entre dos coordenadas.

- **Entradas**:
  - `x0`, `y0`: coordenadas del punto inicial.
  - `x1`, `y1`: coordenadas del punto final.
- **Salida**:
  - Lista de objetos `{x, y, pk}` con:
    - `x`, `y`: coordenadas del punto en la línea.
    - `pk`: valor de decisión (p_k) usado para determinar el siguiente punto.

Este algoritmo calcula incrementos en `x` y `y` usando solo sumas y restas (sin operaciones de coma flotante) para máxima eficiencia.

```js
export function bresenhamLinea(x0, y0, x1, y1) {
  let puntos = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;

  // Valor inicial del parámetro de decisión
  let pk = 2 * dy - dx;
  let x = x0, y = y0;

  if (dx > dy) { // pendiente < 1
    for (let i = 0; i <= dx; i++) {
      puntos.push({ x, y, pk });
      if (pk < 0) {
        x += sx;
        pk += 2 * dy;
      } else {
        x += sx;
        y += sy;
        pk += 2 * (dy - dx);
      }
    }
  } else { // pendiente >= 1
    pk = 2 * dx - dy;
    for (let i = 0; i <= dy; i++) {
      puntos.push({ x, y, pk });
      if (pk < 0) {
        y += sy;
        pk += 2 * dx;
      } else {
        x += sx;
        y += sy;
        pk += 2 * (dx - dy);
      }
    }
  }

  return puntos;
}
```

---

### 2️⃣ Función `bresenhamCircunferencia(r)`

Implementa el **algoritmo de Bresenham para circunferencias** (también llamado “Midpoint Circle Algorithm”), que calcula los puntos necesarios para dibujar una circunferencia usando solo enteros.

- **Entradas**:
  - `r`: radio de la circunferencia (entero positivo).
- **Salida**:
  - Lista de objetos `{x, y, pk}` para cada uno de los ocho octantes de la circunferencia:
    - `x`, `y`: coordenadas de cada punto en los diferentes cuadrantes.
    - `pk`: valor de decisión (p_k) en cada paso.

El algoritmo calcula solo un octante y luego refleja los puntos en los demás cuadrantes para obtener la circunferencia completa.

```js
export function bresenhamCircunferencia(r) {
  let puntos = [];
  let x = 0, y = r;
  let pk = 3 - 2 * r;

  while (y >= x) {
    // Genera puntos para los ocho octantes
    puntos.push({ x: x, y: y, pk });
    puntos.push({ x: -x, y: y, pk });
    puntos.push({ x: x, y: -y, pk });
    puntos.push({ x: -x, y: -y, pk });
    puntos.push({ x: y, y: x, pk });
    puntos.push({ x: -y, y: x, pk });
    puntos.push({ x: y, y: -x, pk });
    puntos.push({ x: -y, y: -x, pk });

    if (pk <= 0) {
      pk = pk + 4 * x + 6;
    } else {
      pk = pk + 4 * (x - y) + 10;
      y--;
    }
    x++;
  }
  return puntos;
}
```

---

## 👥 Integrantes del equipo

- Miguel Axel Fuster Barba  
- Leonardo Garcia Miccete  
- Torres Mora Alan Giovanni  

---

## 📚 Referencias

- [Algoritmo de Bresenham – Wikipedia](https://es.wikipedia.org/wiki/Algoritmo_de_Bresenham)
- [Midpoint Circle Algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm)

---
