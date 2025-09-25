export function bresenhamLinea(x0, y0, x1, y1) {
  let puntos = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;

  // Valor inicial:
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


export function bresenhamCircunferencia(r) {
  let puntos = [];
  let x = 0, y = r;
  let pk = 3 - 2 * r;

  while (y >= x) {
    // Guarda pk con cada punto generado
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
