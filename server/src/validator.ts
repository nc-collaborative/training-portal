// import { validate as _validate, ValidatorOptions } from 'class-validator';

// TODO: validation functions
export function validate(object: object, validatorOptions?: object) {
  return [];
}

// export function validate(object: object, validatorOptions?: ValidatorOptions) {
//   // trim strings
//   for (const [k, v] of Object.entries(object)) {
//     if (typeof v == 'string') {
//       object[k] = v.trim();
//       if (object[k].length == 0) {
//         object[k] = null;
//       }
//     }
//   }

//   return _validate(
//     object,
//     Object.assign({ validationError: { target: false } }, validatorOptions),
//   );
// }
