export class CreateUserDto {
  firstName: string;
  lastName: string;
  token: string;
  login: string;
  password?: string;
  cart: string[];
  favorites: string[];
  orders: string[];
}
