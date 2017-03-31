export function concentric(opts) {
  const {x, y, step, max} = opts
  let points = []
  for( var i = step; i < max; i+= step ) {
    points = points.concat([
      { x: x - i, y: y - i },
      { x: x + i, y: y - i },
      { x: x + i, y: y + i },
      { x: x - (i+step), y: y + i },
    ])
  }

  for( var i = 0; i < 20; i++ ) {
    points = points.concat([
      { x: x - max, y: y - max },
      { x: x + max, y: y - max },
      { x: x + max, y: y + max },
      { x: x - max, u: y + max },
    ])
  }

  return points
}

export function steps(opts) {
  let points = [{x: opts.x, y: opts.y}]
  let xMove = true;
  for( var i = 0; i < opts.steps * 2; i++ ) {
    var lastPoint = points[points.length - 1]
    if( xMove ) {
      points.push({
        x: lastPoint.x + opts.distance,
        y: lastPoint.y
      })
    } else {
      points.push({
        x: lastPoint.x,
        y: lastPoint.y + opts.distance
      })
    }
    xMove = !xMove
  }

  const stepsBack = points.slice(1).reverse();
  stepsBack.shift()
  points = points.concat(stepsBack);
  return points;
}

// http://gamedev.stackexchange.com/questions/9607/moving-an-object-in-a-circular-path
export function circle(x, y, radius) {
  let points = []
  for( var deg = 0; deg < 360; deg += 10 ) {
    // http://www.rapidtables.com/convert/number/degrees-to-radians.htm
    const radians = deg * Math.PI / 180;
    points.push({x: x + Math.cos(radians) * radius, y: y + Math.sin(radians) * radius})
  }
  return points;
}

export function backtrack(points) {
  const stepsBack = points.slice(1).reverse();
  stepsBack.shift()
  return points.concat(stepsBack)
}
