export function log(str: string) {
  console.log(str);
}
log("Hello World");

class A {
  greeting = "Hello";
}

log(new A().greeting);
log("2");
