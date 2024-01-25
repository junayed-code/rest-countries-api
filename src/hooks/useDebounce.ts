export default function useDebounce(callback: Function, timeout: number) {
  let timer: any;

  return function (...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callback(...args), timeout);
  };
}
