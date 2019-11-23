# Suspense Intro

1. 创建一个返回promise的业务接口请求（Axios）
```javascript
const fetchUser = () => {
  console.log("Fetching User...");
  return axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then(res => res.data)
    .catch(err => console.log(err));
};
```

2. 创建一个包裹promise可以返回当前promise所处状态以及相关promise数据的包裹函数

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
    },
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
    },
  };
};
```
3. 导出所有可以包裹的Promise
```javascript
export const fetchaData = () => {
  const userPromise = fetchUser();
  const postsPromise = fetchPosts();
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  };
};
```

4. 在相关业务组件中引用相关接口promise，并在其外层嵌套Suspense组件，并设置fallback
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