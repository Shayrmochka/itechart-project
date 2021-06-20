import { IUser } from './models.interfaces';

export interface IUserAuth {
  token: string;
  user: IUser;
}
