## 类型别名

```typescript
type Name = string;
type NameResolver = () => string;
type NamrOrNameResolver = Name | NameResolver;
function getName(n: NamrOrNameResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

console.log(getName(() => "klay"));
```

```javascript
function getName(n) {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
console.log(
  getName(function() {
    return "klay";
  })
);
```

## 字符串字面量类型

```typescript
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

// 没问题
handleEvent(document.getElementById("hello"), "scroll");
// 报错
handleEvent(document.getElementById("world"), "dbclick");
```

```javascript
function handleEvent(ele, event) {
  // do something
}
// 没问题
handleEvent(document.getElementById("hello"), "scroll");
// 报错
handleEvent(document.getElementById("world"), "dbclick");
```

## 元组

```typescript
type xcatliu = [string, number];
let xcatliu: xcatliu = ["klay", 21];

xcatliu[0] = "30";
xcatliu[1] = 30;
```

## 枚举

```typescript
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

console.log(Days["Sun"]);
console.log(Days[0]);
```

```javascript
var Days;
(function(Days) {
  Days[(Days["Sun"] = 0)] = "Sun";
  Days[(Days["Mon"] = 1)] = "Mon";
  Days[(Days["Tue"] = 2)] = "Tue";
  Days[(Days["Wed"] = 3)] = "Wed";
  Days[(Days["Thu"] = 4)] = "Thu";
  Days[(Days["Fri"] = 5)] = "Fri";
  Days[(Days["Sat"] = 6)] = "Sat";
})(Days || (Days = {}));
console.log(Days["Sun"]);
// 0
console.log(Days[0]);
// Sun
```

## 字符串字面量类型

```typescript
class Animal {
  name = "jack";
  constructor() {}
}

let a = new Animal();
console.log(a.name);

class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    // 属性“name”为私有属性，只能在类“Animal”中访问 protected允许子类访问
    console.log(this.name);
  }
}
```

```javascript
var Animal = /** @class */ (function() {
  function Animal() {
    this.name = "jack";
  }
  return Animal;
})();
var a = new Animal();
console.log(a.name);
```

## 类与接口

### 类实现接口

```typescript
interface Alarm {
  alert();
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log("SecurityDoor alert");
  }
}

class Car implements Alarm {
  alert() {
    console.log("Car alert");
  }
}
```

### 接口继承接口

```typescript
interface Alarm {
  alert();
}

interface LightableAlarm extends Alarm {
  lightOn();
  lightOff();
}
```

### 接口继承类

```typescript
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

### 混合类型

```typescript
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## 泛型

### 基本泛型

```typescript
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, "x");
// ["x", "x", "x"]
```

### 多个泛型

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, "seven"]);
```

### 泛型类之间的继承

```typescript
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
```

### 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```

### 泛型默认值

```typescript
class GenericNumber<T = string> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};
```
