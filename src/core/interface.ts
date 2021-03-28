export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;
export type AnyEnum<T = string> = T;
export type AnyFunction<T = any> = (...args: any[]) => T;
