import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  // AfterLoad,
  // BeforeInsert,
  // BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import { UserRole } from '../enum/role.enum';
import { Favorite } from '../interfaces/favorite.interface';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, select: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fullname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  favorites?: Favorite[];

  // public previousPassword: string;

  // @AfterLoad()
  // public loadPreviousPassword(): void {
  //   this.previousPassword = this.password;
  // }

  // @BeforeInsert()
  // @BeforeUpdate()
  // async setPassword() {
  //   if (this.previousPassword !== this.password && this.password) {
  //     const salt = await bcrypt.genSalt();
  //     this.password = await bcrypt.hash(this.password, salt);
  //   }
  // }

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
