export function createModel<T>(name: string) {
  return Symbol(name) as T & symbol;
}
