# 创建一个typeScript-Redux项目

- [创建一个typeScript-Redux项目](#%e5%88%9b%e5%bb%ba%e4%b8%80%e4%b8%aatypescript-redux%e9%a1%b9%e7%9b%ae)
  - [使用鸭子模型](#%e4%bd%bf%e7%94%a8%e9%b8%ad%e5%ad%90%e6%a8%a1%e5%9e%8b)
  - [样例项目](#%e6%a0%b7%e4%be%8b%e9%a1%b9%e7%9b%ae)
  - [创建第一个模块](#%e5%88%9b%e5%bb%ba%e7%ac%ac%e4%b8%80%e4%b8%aa%e6%a8%a1%e5%9d%97)
  - [函数重载和泛型](#%e5%87%bd%e6%95%b0%e9%87%8d%e8%bd%bd%e5%92%8c%e6%b3%9b%e5%9e%8b)
  - [创建 RootReducer 和 Store](#%e5%88%9b%e5%bb%ba-rootreducer-%e5%92%8c-store)
  - [添加模块和thunk](#%e6%b7%bb%e5%8a%a0%e6%a8%a1%e5%9d%97%e5%92%8cthunk)
  - [在组件中使用](#%e5%9c%a8%e7%bb%84%e4%bb%b6%e4%b8%ad%e4%bd%bf%e7%94%a8)
  - [Dispatching Thunks](#dispatching-thunks)

## 使用鸭子模型

按照一个业务数据模型去分类，而不是根据Redux本身的Reducer，Action，Type去分类放在不同的目录文件夹中，如果是同一个User Reducer，则与之相关的Type和Action全部都写在一个User Module文件中。

## 样例项目

一个购物车应用，有User模块和Products模块

> yarn create react-app shopping-cart --typescript

> yarn add redux react-redux @types/redux @types/react-redux


## 创建第一个模块

src/redux/modules/user.ts
```typescript
type UserState = {
    username: String | null;
};

const initialState: UserState = { username: null };

const login = (username: string) => ({
  type: 'user/LOGIN';
  payload: username;
});

const logout = () => ({
  type: 'user/LOGOUT'
});

type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case 'user/LOGIN':
      return { username: action.payload };
    case 'user/LOGOUT':
      return { username: null };
    default:
      return state;
  }
}
```

不幸的是，我们有几个问题。首先，我们得到以下Typescript编译错误:属性'payload'不存在于类型'{type: string;}”。这是因为我们尝试的union类型不能正常工作，而Typescript编译器认为我们可能有也可能没有登录用例的操作有效负载

第二个问题导致了第一个问题，即Typescript编译器在我们的switch语句中没有检测到不正确的大小写。例如，如果为“user/UPDATE”添加一个案例，我们会希望错误声明它不是一个可用的类型

## 函数重载和泛型

src/redux/modules/user.ts

```ts
export function typedAction<T extends string>(type: T): { type: T };
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload };
}

type UserState = {
  username: string | null;
};

const initialState: UserState = { username: null };

export const login = (username: string) => {
  return typedAction('user/LOGIN', username);
};

export const logout = () => {
  return typedAction('user/LOGOUT');
};

type UserAction = ReturnType<typeof login | typeof logout>;

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case 'user/LOGIN':
      return { username: action.payload };
    case 'user/LOGOUT':
      return { username: null };
    default:
      return state;
  }
}
```

## 创建 RootReducer 和 Store

src/redux/index.ts

```ts
import { combineReducers } from 'redux';
import { userReducer } from './modules/user';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
```

src/index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './redux';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## 添加模块和thunk

> yarn add redux-thunk @types/redux-thunk

src/index.tsx

```ts
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

src/redux/modules/products.ts

```ts
// TODO: We should move typedAction elsewhere since it's shared
import { typedAction } from './users';
import { Dispatch, AnyAction } from 'redux';

type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ProductState = {
  products: Product[];
  loading: boolean;
  cart: CartItem[];
};

const initialState: ProductState = {
  products: [],
  loading: false,
  cart: [],
};

const addProducts = (products: Product[]) => {
  return typedAction('products/ADD_PRODUCTS', products);
};

export const addToCart = (product: Product, quantity: number) => {
  return typedAction('products/ADD_TO_CART', { product, quantity });
};

// Action creator returning a thunk!
export const loadProducts = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      // Pretend to load an item
      dispatch(
        addProducts([
          {
            id: 1,
            name: 'Cool Headphones',
            price: 4999,
            img: 'https://placeimg.com/640/480/tech/5',
          },
        ])
      );
    }, 500);
  };
};

type ProductAction = ReturnType<typeof addProducts | typeof addToCart>;

export function productsReducer(
  state = initialState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case 'products/ADD_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    case 'products/ADD_TO_CART':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.payload.product.id,
            quantity: action.payload.quantity,
          },
        ],
      };
    default:
      return state;
  }
}
```

src/redux/index.ts

```ts
import { combineReducers } from 'redux';
import { userReducer } from './modules/user';
import { productsReducer } from './modules/products';

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
```

## 在组件中使用

src/Auth.tsx

```tsx
import React from 'react';
import { RootState } from './redux';
import { login, logout } from './redux/modules/user';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
  username: state.user.username,
});

const mapDispatchToProps = { login, logout };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UnconnectedAuth: React.FC<Props> = props => {
  // Do auth things here!
  return <>{props.username}</>;
};

export const Auth = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedAuth);
```


## Dispatching Thunks

```tsx
import React from 'react';
import { RootState } from './redux';
import { loadProducts } from './redux/modules/products';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
  cart: state.products.cart,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      loadProducts,
    },
    dispatch
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const UnconnectedProducts: React.FC<Props> = props => {
  // Do cart things here!
  return <>Your Cart</>;
};

export const Products = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedProducts);
```