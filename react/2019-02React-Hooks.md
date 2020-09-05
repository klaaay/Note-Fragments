- [什么是React Hooks?](#%E4%BB%80%E4%B9%88%E6%98%AFreact-hooks)
- [React Hooks出现的原因](#react-hooks%E5%87%BA%E7%8E%B0%E7%9A%84%E5%8E%9F%E5%9B%A0)
- [Hook: 状态管理](#hook-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)
  - [当前组件状态管理（State）](#%E5%BD%93%E5%89%8D%E7%BB%84%E4%BB%B6%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86state)
    - [类组件](#%E7%B1%BB%E7%BB%84%E4%BB%B6)
    - [纯函数组件(含hook)](#%E7%BA%AF%E5%87%BD%E6%95%B0%E7%BB%84%E4%BB%B6%E5%90%ABhook)
    - [实例解释](#%E5%AE%9E%E4%BE%8B%E8%A7%A3%E9%87%8A)
    - [状态不会自动合并](#%E7%8A%B6%E6%80%81%E4%B8%8D%E4%BC%9A%E8%87%AA%E5%8A%A8%E5%90%88%E5%B9%B6)
  - [跨多个组件（局部）全局状态管理（Props）](#%E8%B7%A8%E5%A4%9A%E4%B8%AA%E7%BB%84%E4%BB%B6%E5%B1%80%E9%83%A8%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86props)
    - [React-Context API的使用](#react-context-api%E7%9A%84%E4%BD%BF%E7%94%A8)
    - [React-Context API 的内置Hook使用](#react-context-api-%E7%9A%84%E5%86%85%E7%BD%AEhook%E4%BD%BF%E7%94%A8)
    - [类Redux-Reducer ,useReducer Hook的使用](#%E7%B1%BBredux-reducer-usereducer-hook%E7%9A%84%E4%BD%BF%E7%94%A8)
- [生命周期函数](#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0)
  - [componentDidMount](#componentdidmount)
  - [componentDidUpdate](#componentdidupdate)
  - [componentWillUnmount](#componentwillunmount)
  - [shouldComponentUpdate](#shouldcomponentupdate)
- [构建自己的Hook](#%E6%9E%84%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84hook)
  - [建立自己的钩子有什么好处？](#%E5%BB%BA%E7%AB%8B%E8%87%AA%E5%B7%B1%E7%9A%84%E9%92%A9%E5%AD%90%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E5%A4%84)
- [钩子规则](#%E9%92%A9%E5%AD%90%E8%A7%84%E5%88%99)

# 什么是React Hooks?
+ React可以让你所有组件都采用纯函数编译，不再需要class组件
+ 可以用Hooks帮助纯函数组件实现`状态管理`,`生命周期`,`函数副作用`

# React Hooks出现的原因
+ 组件之间的逻辑复用实现困难
+ 类组件会困扰开发者，并且很容易被错误得使用

# Hook: 状态管理
## 当前组件状态管理（State）
### 类组件
```javascript
import React, { Component } from 'react';

class Shop extends Component {
  state = { cart: [] }

  cartHandler = () => {
    this.setState({ cart: ['A Book'] }
  }

  render() {
    return (
      <button onClick={this.cartHandler}>
        Add to Cart
      </button>
    )
  }
}
```
### 纯函数组件(含hook)
```javascript
import React, { useState } from 'react'

const Shop = props => {
  const [cart, setCart] = useState([])

  const cartHandler = () => {
    setCart(['A Book'])
  }

  return <button onClick={cartHandler}>Add to Cart</button>
}
```
### 实例解释
+ 你传入初始状态( `[]` )
+ 它返回一个包含2个元素的数组（[`cart，setCart`] =>当前状态和状态设置函数）
+ 使用第一个元素访问状态,并使用第二个元素（这是一个函数）改变这个状态

### 状态不会自动合并
> 除了不同的语法之外，useState（）的工作方式也与基于类的组件中的state + setState不同！

> 当你使用React Hooks设置新状态时（例如，在我们的示例中通过setCart），旧状态将始终被替换！

> 因此，如果您有多个独立的状态切片，则需要使用多个useState（）调用：
```javascript
const Shop = props => {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [userData, setUserData] = useState({name: 'klay', age: 21})
  return ...
}
```
> 这样每个state都是独立的，更新不会影响其他的state

> 使用React Hooks时，State可以是任何东西：数组，对象，数字，字符串或布尔值。

## 跨多个组件（局部）全局状态管理（Props）
### React-Context API的使用
### React-Context API 的内置Hook使用
```javascript
import React, { useContext } from 'react'
import ThemeContext from './theme-context'

const Person = props => {
  const context = useContext(ThemeContext)
  return <p className={context.isLight ? 'light' : 'dark'}>...</p>
}
```
### 类Redux-Reducer ,useReducer Hook的使用
```javascript
const initialState = { cart: [] } // could also be just an array or a string etc

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { cart: state.cart.concat(action.item) }
    case 'REMOVE_FROM_CART':
      return { cart: state.cart.filter(item => item.id !== action.id) }
    default:
      return state
  }
}

const Shop = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <button
        onClick={() =>
          dispatch({ type: 'ADD_TO_CART', item: { id: 'p1', name: 'A Book' } })
        }
      >
        Add to Cart
      </button>
      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: 'p1' })}>
        Remove from Cart
      </button>
    </div>
  )
}
```


# 生命周期函数

## componentDidMount
```javascript
componentDidMount() {
    fetch('my-backend.com/products')
    .then(res => res.json())
    .then(fetchedProducts => this.setState({products: fetchedProducts}))
}
```
```javascript
useEffect(() => {
    fetch('my-backend.com/products')
      .then(res => res.json())
      .then(fetchedProducts => setProducts(fetchedProducts))
  }, [])
```
> useEffect（）将第一个函数参数作为输入并且不返回任何内容。在每个渲染周期后，它将执行所需的功能。

> useEffect（）第二个数组参数，它允许我们控制何时执行作为第一个参数传入的函数，传入空函数即在第一次执行之后不再执行

## componentDidUpdate
```javascript
useEffect(() => {
  fetch('my-backend.com/products/' + selectedId)
    .then(res => res.json())
    .then(fetchedProducts => setProducts(fetchedProducts))
}, [])
```
> 在这种情况下，useEffect（）内部的函数只运行一次是不可取的。它应该在selectedId更改时运行。

```javascript
useEffect(() => {
  fetch('my-backend.com/products/' + selectedId)
    .then(res => res.json())
    .then(fetchedProducts => setProducts(fetchedProducts))
}, [selectedId])
```
> 我们不传递空数组（[]），而是传递包含selectedId的数组

> 你基本上是在告诉React：
>> *嘿React，这是这​​个函数的所有依赖项的数组：selectedId。当更改时，您应该再次运行该功能。忽略对任何其他变量或常量的任何其他更改。*

## componentWillUnmount 
```javascript
useEffect(() => {
    return () => {
      console.log("component did unmount");
    };
  }, []);
```
> 返回的函数再每次被重新渲染或者卸载的时候运行

## shouldComponentUpdate
```javascript
import React from 'react'

const Person = props => {
  return <p>My name is {props.name}</p>
}

export default React.memo(Person)
```
> <Person />仅取决于名称prop，因此如果该prop更改，它只应由React重新评估。如果其父组件发生更改但名称保持不变，则不应对其进行评估（默认情况下，即使名称未更改，也会重新呈现）。

# 构建自己的Hook
> 除了能够管理功能组件中的状态和副作用外，React Hooks还为您提供了一个额外的强大工具：您可以编写自己的钩子并在组件之间共享它们。最好的是，这些自定义Hook可以是有状态的 - 即您可以在其中使用其他Hook（如useState（））。

```javascript
import { useState, useEffect } from 'react'

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    console.log('Sending Http request to URL: ' + url)
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.')
        }
        return response.json()
      })
      .then(data => {
        setIsLoading(false)
        setFetchedData(data)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }, dependencies)

  return [isLoading, fetchedData]
}
```
> 此自定义Hook使用Fetch API将请求发送到作为参数传递给Hook的URL。它还接收在自定义Hook中使用的useEffect（）的依赖项。

> 而这个自定义Hook也返回了一些东西：isLoading和fetchedData。

> 这允许我们在功能组件中使用这样的Hook
```javascript
const MyComponent = props => {
  const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people', []);
  return isLoading ? <p>Loading...</p> : <DataOutput data={fetchedData} />;
}
```
## 建立自己的钩子有什么好处？
> 您可以比以前更轻松地共享和重用代码！此示例中共享的代码包括生命周期方法(过去在生命周期方法中处理过的东西)和一些内部管理的state。它可以用于您想要的任何功能组件

# 钩子规则
+ 只能在功能组件的顶层调用Hooks！

>  update on 2019-2-22-2:01

