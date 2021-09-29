import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', { nullable: true })
  firstName: string;

  @Column('varchar', { nullable: true })
  lastName: string;

  @Column('varchar', { nullable: true })
  login: string;

  @Column('varchar', { nullable: true })
  password?: string;

  @Column('json', { nullable: true })
  cart: string[];

  @Column('json', { nullable: true })
  favorites: string[];

  @Column('json', { nullable: true })
  orders: string[];

  static toResponse(user: User | undefined): User | undefined {
    if (user !== undefined) {
      const { id, firstName, lastName, login, cart, favorites, orders } = user;
      return {
        id,
        firstName,
        lastName,
        login,
        cart,
        favorites,
        orders,
      };
    }
    return undefined;
  }
}
