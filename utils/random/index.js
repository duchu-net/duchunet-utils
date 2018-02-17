export XorShift128 from './XorShift128'

export function int(from = 1, to = 100) {
  return Math.floor((Math.random() * to) + from);
}

export function uuid() {
  return uuid4();
}

export function uuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export function elementFromArray(array = []) {
  const random_num = int(0, array.length - 1)
  return array[random_num]
}
