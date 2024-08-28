const myName = 'Nicolas';
const myAgge = 32;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 12);

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `my name is ${this.name}`;
  }
}

const daniel = new Persona(32, 'Daniel');

daniel.getSummary();
