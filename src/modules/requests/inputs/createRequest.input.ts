import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';
import { JsonProperty, Example } from '@tsed/common';

export class CreateRequestInput {
  @IsEmail()
  @JsonProperty()
  public email: string;

  @IsString()
  @JsonProperty()
  public phone: string;

  @IsString()
  @JsonProperty()
  public networkName: string;

  @IsString()
  @JsonProperty()
  public name: string;
}
