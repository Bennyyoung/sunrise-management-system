/* eslint-disable @typescript-eslint/ban-types */

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T extends object
  ? U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : U
  : T;

export type NoInfer<T> = [T][T extends any ? 0 : never];

export type PrismaFindArgs<I = undefined, S = undefined> = {
  include: I;
  select: S;
};

export type KeyValuePair<T> = {
  [key in string | number | symbol]: T;
};
