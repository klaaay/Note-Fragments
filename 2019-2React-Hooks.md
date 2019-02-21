# 什么是React Hooks?
+ React可以让你所有组件都采用纯函数编译，不再需要class组件
+ 可以用Hooks帮助纯函数组件实现`状态管理`,`生命周期`,`函数副作用`

# React Hooks出现的原因
+ 组件之间的逻辑复用实现困难
+ 类组件会困扰开发者，并且很容易被错误得使用

# Hook: 状态管理
## 类组件
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
## 纯函数组件(含hook)
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
## 实例解释
+ 你传入初始状态( `[]` )
+ 它返回一个包含2个元素的数组（[`cart，setCart`] =>当前状态和状态设置函数）
+ 使用第一个元素访问状态,并使用第二个元素（这是一个函数）改变这个状态

## 状态不会自动合并
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