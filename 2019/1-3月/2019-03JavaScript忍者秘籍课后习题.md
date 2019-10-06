# 第 3 部分 深入研究对象，强化代码

## 第七章 面向对象与原型

```javascript
function Ninja() {
  Ninja.prototype.talk = function() {
    return "Hello";
  };
}

const ninja = new Ninja();
const a1 = ninja.talk();
// 变量a1的值是多少?
// "Hello"
```

```javascript
function Ninja() {}
Ninja.message = "Hello";
const ninja = new Ninja();
const a1 = ninja.message;
// undefined
```

```javascript
// First Fragament
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.getFullName = function() {
    return this.firstName + " " + this.lastName;
  };
  return "HAHA";
  //   console.log(this);
}

console.log(new Person("Klay", "Wu").getFullName());
console.log(new Person("Klay", "Wu"));

// Second Fragament
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  console.log(this);
}

Person.prototype.getFullName = function() {
  console.log(this);
  return this.firstName + " " + this.lastName;
};

const a1 = new Person("Klay", "Wu");
console.log(a1.getFullName());
```

```javascript
function Person() {}
function Ninja() {}

const ninja = new Ninja();
console.log(ninja.constructor);
console.log(typeof ninja);
console.log(ninja.toString());
console.log(ninja.__proto__.constructor);
console.log(Ninja);
console.log("haha");
```

```javascript
function Warrior() {}

function Samurai() {}
Samurai.prototype = new Warrior();
var samurai = new Samurai();
console.log(samurai instanceof Warrior);
function Warrior() {}

function Samurai() {}
Samurai.prototype = Warrior.prototype;
var samurai = new Samurai();
console.log(samurai instanceof Warrior);
```

```javascript
// 两种方法不存在本质的区别 ES6为语法糖表示法
// ES6 version
class Warrior {
  constructor(weapon) {
    this.weapon = weapon;
  }

  wield() {
    return "Wielding " + this.weapon;
  }

  static duel(warrior1, warrior2) {
    return warrior1.wield() + " " + warrior2.wield();
  }
}
// ES5 version
function Warrior(weapon) {
  this.weapon = weapon;

  this.wield = function() {
    return "Wielding " + this.weapon;
  };
}

Warrior.duel = function(warrior1, warrior2) {
  return warrior1.wield() + " " + warrior2.wield();
};

const warrior1 = new Warrior("arrow");
const warrior2 = new Warrior("sword");
console.log(warrior1.wield());
console.log(warrior2.wield());
console.log(Warrior.duel(warrior1, warrior2));
```

## 第八章 控制对象的访问

```javascript
const daimyo = { name: "Matsu", clan: "Takasu" };

const proxy = new Proxy(daimyo, {
  get: (target, key) => {
    if (key === "clan") {
      return "Tokugawa";
    }
  }
});

console.log(daimyo.clan);
// Takasu
console.log(proxy.clan);
// Tokugawa
proxy.clan = "Tokugawa";
console.log(daimyo.clan);
// Tokugawa
console.log(proxy.clan);
// Tokugawa
```

```javascript
const daimyo = {
  name: "Matsu",
  clan: "Takasu",
  armySize: 10000
};

const proxy = new Proxy(daimyo, {
  set: (target, key, value) => {
    if (key === "armySize") {
      const number = Number.parseInt(value);
      if (!Number.isNaN(number)) {
        target[key] = number;
      }
    } else {
      target[key] = value;
    }
  }
});

proxy.armySize = "large";
console.log(proxy);
// { name: 'Matsu', clan: 'Takasu', armySize: 10000 }
daimyo.armySize = "large";
console.log(daimyo);
// { name: 'Matsu', clan: 'Takasu', armySize: 'large' }
```

## 第九章 处理集合

```javascript
const samuraiClanMap = new Map();
const a1 = { name: "Toyo" };
const a2 = { name: "Take" };
const a3 = { name: "Akiy" };

const oda = { clan: "oda" };
const toku = { clan: "toku" };
const take = { clan: "take" };

samuraiClanMap.set(a1, oda);
samuraiClanMap.set(a2, toku);
samuraiClanMap.set(a3, take);

console.log(samuraiClanMap.size);
// 3
console.log(samuraiClanMap.has(a1));
// true
console.log(samuraiClanMap.has(a3));
// true
```

```javascript
const samurai = new Set(["Toyotomi", "Takeda", "Akiyama", "Akiyama"]);
console.log(samurai);
// Set { 'Toyotomi', 'Takeda', 'Akiyama' }
const samurai1 = new Set("Toyotomi", "Takeda", "Akiyama", "Akiyama");
console.log(samurai1);
// Set { 'T', 'o', 'y', 't', 'm', 'i' }
```