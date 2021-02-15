// import { Table, Column, Model } from 'sequelize-typescript';

// @Table
// export class User extends Model<User> {
//     @Column({
//         allowNull: false,
//         autoIncrement: true,
//         unique: true,
//         primaryKey: true,
//     })
//     id: number;

//     @Column({
//         allowNull: false,
//     })
//     name: string;

//     @Column({
//         allowNull: false,
//         validate: {
//             isEmail: true,
//         },
//     })
//     email: string;

//     @Column({
//         allowNull: false,
//     })
//     password: string;
// }

import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}