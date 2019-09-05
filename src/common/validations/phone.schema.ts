import * as yup from 'yup';

export const phoneSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(['personal'])
    .required(),
  number: yup
    .string()
    .matches(/^\([0-9]{2}\) [0-9]?[0-9]{4}-?[0-9]{4}$/)
    .required(),
});
