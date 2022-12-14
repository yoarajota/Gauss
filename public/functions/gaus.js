import _, { last, some } from "lodash";

function compare(X, XK, EPS) {
  let sum = 0;
  let zipped = X.map((k, i) => [k, XK[i]]);

  for (let i = 0; i < zipped.length; i++) {
    let y =
      Math.abs(parseFloat(zipped[i][1])) - Math.abs(parseFloat(zipped[i][0]));
    sum = sum + Math.abs(y);
  }

  if (sum < EPS) {
    return true;
  } else {
    return false;
  }
}

export default function gausJacobi(STATE) {
  let LOG = [];

  let n = STATE.b.length;

  let s = true;

  var x = _.clone(STATE.b);

  for (let i = 0; i < n; i++) {
    if (Math.abs(parseFloat(STATE.a[i][i])) > 0) {
      x[i] = parseFloat(STATE.b[i]) / parseFloat(STATE.a[i][i]);
    } else {
      s = false;
      break;
    }
  }

  if (s) {
    LOG.push("Iteration 0");
    LOG.push(_.clone(x));

    let xk = _.clone(x);
    let iter = 0;

    while (iter < parseFloat(STATE.c)) {
      iter++;

      for (let i = 0; i < n; i++) {
        let s = 0;
        for (let j = 0; j < n; j++) {
          if (i != j) {
            s = s + parseFloat(STATE.a[i][j]) * parseFloat(x[j]);
          }
        }

        xk[i] = (1 / parseFloat(STATE.a[i][i])) * (parseFloat(STATE.b[i]) - s);
      }

      LOG.push(`Iteration ${iter}`);
      LOG.push(_.clone(xk));

      if (compare(x, xk, parseFloat(STATE.d))) {
        x = _.clone(xk);
        break;
      }

      var x = _.clone(xk);
    }
  }

  return { x, LOG };
}

export function gausSeidel(STATE) {
  var LOG = []
  var solution = STATE.d.split(", ");
  console.log(solution, parseFloat(STATE.c));

  let i = 0;
  while (i < parseFloat(STATE.c)) {
    
    for (let c = 0; c < STATE.a.length; c++) {
      
      var x = parseFloat(STATE.b[c]);
      
      for (let cc = 0; cc < STATE.a.length; cc++) {
        
        if (c != cc) {
          
          x -= parseFloat(STATE.a[c][cc]) * parseFloat(solution[cc]);
          
        }
        
      }
      
      x /= parseFloat(STATE.a[c][c]);
      
      solution[c] = x;
    }
    LOG.push(`Iteration ${i}`);
    LOG.push(_.clone(solution));
    i++;
  }

  var x = solution;
  return { x, LOG };
}
