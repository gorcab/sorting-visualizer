type VoidReturnFunc = (...args: any[]) => void;

export function callAll(...functions: Array<VoidReturnFunc | undefined>) {
  return (...args: any[]) => functions.forEach((func) => func && func(...args));
}
