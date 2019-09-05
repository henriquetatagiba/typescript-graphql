import * as yup from 'yup';
import { documentSchema } from '../../common/validations/document.schema';
import { phoneSchema } from '../../common/validations/phone.schema';
import { userModel, User } from './user.model';
import { addressSchema } from '../../common/validations/address.schema';

export const createUserSchema = () =>
  yup.object().shape({
    name: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(6)
      .required(),
    address: yup.array().of(addressSchema.required()),
    phones: yup
      .array()
      .of(phoneSchema.required())
      .required(),
    documents: yup
      .array()
      .of(documentSchema.required())
      .required(),
  });
