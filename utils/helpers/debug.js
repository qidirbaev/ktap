export const debug = (message = 'Line is working', test_obj) => {
  if (typeof message === 'number') {
    console.log(`${message}-line: `, test_obj);
    return;
  }
  console.log(`${message}: [${new Date().getTime()}]`, test_obj);
  return;
}