import * as mongoose from 'mongoose';

export const connect = (): Promise<mongoose.Mongoose> => {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not found!');

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
