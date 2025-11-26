// debounce function
export function debounce<Func extends (...args: any[]) => void>(func: Func, wait: number): Func {
  let timeout: number | undefined;
  return function (this: any, ...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(this, args);
    }, wait);
  } as Func;
}
