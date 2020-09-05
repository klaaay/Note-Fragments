function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}



console.log(Elf.prototype);

const peter = new Elf('Peter', 'stones')
console.log(peter.name);