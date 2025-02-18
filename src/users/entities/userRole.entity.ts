import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./role.entitiy";

@Entity('user_roles')
export class UserRoles{
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn('uuid')
  user_guid: string;

  @Column()
  role_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;

  @Column({
    nullable: true
  })
  updated_at: Date;

  @Column({
    nullable: true
  })
  updated_by: string;

  @Column()
  created_by: string;

  @ManyToOne(() => User, user => user.roles)
  @JoinColumn({ name: 'user_guid', referencedColumnName: 'guid' })
  @Index()
  user: User

  @ManyToOne(() => Role, role => role.roles)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  @Index()
  role: Role


}