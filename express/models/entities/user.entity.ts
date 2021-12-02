import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  modelName: 'user',
  tableName: 'users',
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER({ length: 11 }))
  readonly id!: number

  @Column(DataType.STRING(255))
  name!: string

  @Column(DataType.INTEGER({ length: 11 }))
  age!: number
}
