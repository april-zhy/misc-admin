export function asleep(ms = 1) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function deepClone<T>(source: T): T {
  if (source === null || source === undefined || typeof source !== "object") {
    return source;
  }
  const _targetObj = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object") {
        Object.defineProperty(_targetObj, key, {
          value: deepClone(source[key]),
        });
      } else {
        Object.defineProperty(_targetObj, key, {
          value: source[key],
        });
      }
    }
  }
  return _targetObj as T;
}

const TAX_RULE_YEAR = [
  [36000, 0.03, 0],
  [144000, 0.1, 2520],
  [3000000, 0.2, 16920],
  [420000, 0.25, 31920],
  [660000, 0.3, 52920],
  [960000, 0.35, 85920],
];
const TAX_RULE_MONTH = [
  [3000, 0.03, 0],
  [12000, 0.1, 210],
  [25000, 0.2, 1410],
  [35000, 0.25, 2660],
  [55000, 0.3, 4410],
  [80000, 0.35, 7160],
];
export function calcTax(
  taxable: number,
  ANNUL = false
): { tax: number; rate: number } {
  let tax = 0;
  let rate = 0;
  const RULES = ANNUL ? TAX_RULE_MONTH : TAX_RULE_YEAR;
  const _taxable = ANNUL ? taxable / 12 : taxable;
  for (let i = 0; i < RULES.length; i++) {
    const [_threshold, _rate, _sub] = RULES[i];
    if (_taxable <= _threshold) {
      rate = _rate;
      tax = Math.round(_taxable * _rate - _sub);
      break;
    }
  }
  return { tax: tax, rate: rate };
}

export function stringify<T>(param: T): string {
  if (!param) {
    throw new Error("Invalid Params.");
  }
  const arr = [];
  for (const key in param) {
    if (Object.hasOwnProperty.call(param, key)) {
      const value = param[key];
      if (value !== undefined && value !== null) {
        arr.push(key + "=" + value);
      }
    }
  }
  return arr.join("&");
}
