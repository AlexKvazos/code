let userName = '';

export function getName() {
  return userName
}

export function setName(name) {
  console.log('name is ' + name)
  userName = name;
}

export default {
  getName, setName
}
