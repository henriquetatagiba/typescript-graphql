import * as yup from 'yup';
import { cpfSchema } from './fields/cpf.schema';
import { cnpjSchema } from './fields/cnpj.schema';

export const documentSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(['cpf', 'cnpj', 'rg'])
    .required(),
  number: yup
    .string()
    .required()
    .when('type', {
      is: 'cpf',
      then: cpfSchema.required(),
    })
    .when('type', {
      is: 'cnpj',
      then: cnpjSchema.required(),
    }),
});
