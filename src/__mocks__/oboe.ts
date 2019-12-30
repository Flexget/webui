export default function oboe() {
  const self = {
    abort: () => self,
    on: () => self,
    fail: () => self,
    done: () => self,
    start: () => self,
    node: () => self,
  };

  return self;
}
