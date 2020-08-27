import { getModelForClass, ModelOptions, Prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Request {
  public id: string;

  @Prop()
  public email: string;

  @Prop()
  public phone: string;

  @Prop()
  public networkName: string;

  @Prop()
  public name: string;
}

export const requestModel = getModelForClass(Request);
