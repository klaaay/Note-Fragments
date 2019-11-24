## Normal

https://warhol.io/blog/reducing-redux-boilerplate-in-typescript

```typescript
type IncrementAction = Readonly<{
  readonly type: "INCREMENT";
  payload: number;
}>;

epxort const increment = (amount: number):IncrementAction => {
    return {
        type: "INCREMENT",
        payload:amount
    }
}

type DecrementAction = Readonly<{
    readonly type: "DECREMENT";
    payload: number;
}>

export const decrement = (amount: number):DecrementAction => {
    return {
        type: "DECREMENT",
        payload:amount
    }
}

export type AnyAction = IncrementAction | DecrementAction;

```

## Action types from (inferred) action creator types

```typescript
export const increment = (amount: number) => {
  return {
    type: "INCREMENT",
    payload: amount
  } as const;
};

export const decrement = (amount: number) => {
  return {
    type: "DECREMENT",
    payload: amount
  } as const;
};

export type AnyAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>;
```

## Action types inferred from module types

> The code to automatically create a discriminated union over all possible action types from action creator functions looks as follows:

```typescript
type ActionCreators  =type import("./actionCreators")
export type AnyAction = {
  [Name in keyof ActionCreators]: ActionCreators[Name] extends ((...args: any[]) => any)
    ? ReturnType<ActionCreators[Name]>
    : never
}[keyof ActionCreators];
```

```typescript
// Action creator modules
type FooActionCreators = typeof import("./foo/actionCreators");
type BarActionCreators = typeof import("./bar/actionCreators");

// Merge object types with an intersection type
type ActionCreators = FooActionCreators & BarActionCreators;

// Works just like before
export type AnyAction = {
  [Name in keyof ActionCreators]: ActionCreators[Name] extends (
    ...args: any[]
  ) => any
    ? ReturnType<ActionCreators[Name]>
    : never;
}[keyof ActionCreators];
```
