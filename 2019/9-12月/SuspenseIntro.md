# Suspense Intro

- [Suspense Intro](#suspense-intro)
  - [1. 创建一个返回 promise 的业务接口请求（Axios,fetch, 自定义 promise...）](#1-%e5%88%9b%e5%bb%ba%e4%b8%80%e4%b8%aa%e8%bf%94%e5%9b%9e-promise-%e7%9a%84%e4%b8%9a%e5%8a%a1%e6%8e%a5%e5%8f%a3%e8%af%b7%e6%b1%82axiosfetch-%e8%87%aa%e5%ae%9a%e4%b9%89-promise)
  - [2. 构建一个满足 Suspense 返回需求规范的 wrapPromise 工具函数](#2-%e6%9e%84%e5%bb%ba%e4%b8%80%e4%b8%aa%e6%bb%a1%e8%b6%b3-suspense-%e8%bf%94%e5%9b%9e%e9%9c%80%e6%b1%82%e8%a7%84%e8%8c%83%e7%9a%84-wrappromise-%e5%b7%a5%e5%85%b7%e5%87%bd%e6%95%b0)
  - [3. 导出所有可以包裹的 Promise](#3-%e5%af%bc%e5%87%ba%e6%89%80%e6%9c%89%e5%8f%af%e4%bb%a5%e5%8c%85%e8%a3%b9%e7%9a%84-promise)
  - [4. 在相关业务组件中引用相关接口 promise，并在其外层嵌套 Suspense 组件，并设置 fallback](#4-%e5%9c%a8%e7%9b%b8%e5%85%b3%e4%b8%9a%e5%8a%a1%e7%bb%84%e4%bb%b6%e4%b8%ad%e5%bc%95%e7%94%a8%e7%9b%b8%e5%85%b3%e6%8e%a5%e5%8f%a3-promise%e5%b9%b6%e5%9c%a8%e5%85%b6%e5%a4%96%e5%b1%82%e5%b5%8c%e5%a5%97-suspense-%e7%bb%84%e4%bb%b6%e5%b9%b6%e8%ae%be%e7%bd%ae-fallback)
  - [5. 对于需要交互的 POST 请求或者需要交互的 GET 请求的处理](#5-%e5%af%b9%e4%ba%8e%e9%9c%80%e8%a6%81%e4%ba%a4%e4%ba%92%e7%9a%84-post-%e8%af%b7%e6%b1%82%e6%88%96%e8%80%85%e9%9c%80%e8%a6%81%e4%ba%a4%e4%ba%92%e7%9a%84-get-%e8%af%b7%e6%b1%82%e7%9a%84%e5%a4%84%e7%90%86)
  - [6. 错误处理](#6-%e9%94%99%e8%af%af%e5%a4%84%e7%90%86)

## 1. 创建一个返回 promise 的业务接口请求（Axios,fetch, 自定义 promise...）

```javascript
// axios
const fetchUser = () => {
  console.log("Fetching User...");
  return axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.data)
    .catch(err => console.log(err));
};

// fetch
const fectchPerson = () => {
  return fetch("https://randomuser.me/api")
    .then(x => x.json())
    .then(res => res.results[0]);
};

// 自定义的promise
const randomNumber = () => {
  return new Promise(res => setTimeout(() => res(Math.random()), 3000));
};
```

## 2. 构建一个满足 Suspense 返回需求规范的 wrapPromise 工具函数

```javascript
const wrapPromise = promise => {
  // Set inital status
  let status = "pending";
  // Store result
  let result;
  let suspender = promise.then(
    res => {
      status = "success";
      result = res;
    },
    err => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else {
        return result;
      }
    }
  };
};
```

## 3. 导出所有可以包裹的 Promise

```javascript
export const createResource = () => {
  return {
    user: wrapPromise(fetchUser()),
    posts: wrapPromise(fetchPosts())
  };
};
```

## 4. 在相关业务组件中引用相关接口 promise，并在其外层嵌套 Suspense 组件，并设置 fallback

```javascript
function App() {
  return (
    <div className="App">
      <Suspense fallback="loading user">
        <ProfileDetails />
      </Suspense>
      <Suspense fallback="loading posts">
        <ProfilePosts />
      </Suspense>
    </div>
  );
}
```

```javascript
const resource = createResource();

const ProfileDetails = () => {
  const user = resource.user.read();

  return (
    <ul>
      <li>{user.username}</li>
      <li>{user.email}</li>
      <li>{user.address.city}</li>
    </ul>
  );
};
```

## 5. 对于需要交互的 POST 请求或者需要交互的 GET 请求的处理

使用 useState 创建状态

```javascript
const [postResource, setPostResource] = useState({
  result: {
    read() {
      return null;
    }
  }
});
```

通过交互创建相应的符合 Suspense 规范的 resource

```javascript
<button
  onClick={() => {
    const promise = fetch("https://ent5gpcpkaax.x.pipedream.net/", {
      method: "post",
      body: JSON.stringify({ hello: "world" })
    })
      .then(x => x.json())
      .then(x => {
        console.log(x);
        return x;
      });
    setPostResource({ result: wrapPromise(promise) });
  }}
>
  call post request
</button>
```

使用相同的方法导入到组件并用 Suspense 组件包裹

```javascript
// App 文件中对PostResult组件的引用
<Suspense fallback={null}>
  <PostResult resource={postResource}></PostResult>
</Suspense>;

// PostResult组件
const PostResult = ({ resource }) => {
  const data = resource.result.read();

  if (!data) {
    return "postting";
  }
  return <div>{JSON.stringify(data)}</div>;
};
export default PostResult;
```

## 6. 错误处理

定义 ErrorBoundary 组件

```javascript
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo)
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong:{this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}
```

使用该组件

```javascript
<ErrorBoundary>
  <Suspense fallback={<h1>Loading</h1>}>
    <Person resource={resource} />
    <Suspense fallback={null}>
      <PostResult resource={postResource}></PostResult>
    </Suspense>
  </Suspense>
</ErrorBoundary>
```
