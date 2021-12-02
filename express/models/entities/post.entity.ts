import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  modelName: 'post',
  tableName: 'posts',
})
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER({ length: 11 }))
  readonly id!: number

  @Column(DataType.STRING(255))
  message!: string

  @Column(DataType.INTEGER({ length: 11 }))
  user_id!: number

  @Column(DataType.DATE())
  created_at!: string

  @Column(DataType.DATE())
  updated_at!: string
}
