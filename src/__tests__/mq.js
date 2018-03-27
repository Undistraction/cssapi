// import { mq } from '..';

// describe(`theme()`, () => {
//   it(`returns value at shallow depth`, () => {
//     const value = {
//       theme: {
//         [key1]: value1,
//       },
//     };
//     const result = theme(key1)(value);
//     expect(result).toEqual(value1);
//   });

//   it(`throws with no theme present`, () => {
//     const value = {};
//     expect(() => theme(key1)(value)).toThrow(
//       `[cssapi] theme() There is no 'theme' available on the props object`
//     );
//   });

//   it(`throws with nothing at path`, () => {
//     const value = {
//       theme: {},
//     };
//     expect(() => theme(key1)(value)).toThrow(
//       `[cssapi] theme() Theme doesn't provide a value at path '${key1}'`
//     );
//   });
// });
