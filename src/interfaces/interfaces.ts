export interface IQuery {
  ids?: string;
  name?: string;
  limit?: string;
  login?: string;
}

export interface IRegisterUser {
  id?: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export interface ILoginUser {
  login: string;
  password: string;
}
