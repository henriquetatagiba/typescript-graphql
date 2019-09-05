import * as yup from 'yup';

export const addressSchema = yup.object().shape({
  country: yup
    .string()
    .oneOf(['br'])
    .lowercase()
    .required(),
  zipcode: yup
    .string()
    .length(8)
    .required(),
  state: yup
    .string()
    .oneOf([
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ])
    .uppercase()
    .required(),
  city: yup.string().required(),
  street: yup.string().required(),
  streetNumber: yup.string().required(),
  neighborhood: yup.string().required(),
  complementary: yup.string(),
});
