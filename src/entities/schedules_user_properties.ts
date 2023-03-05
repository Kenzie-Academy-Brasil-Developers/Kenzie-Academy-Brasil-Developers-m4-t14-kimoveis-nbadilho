import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { RealEstate } from "./real_estate.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
export class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  date: Date;

  @Column()
  hour: Date;

  @ManyToOne(() => RealEstate, (real_estate) => real_estate.id)
  realEstatate: RealEstate;

  @ManyToOne(() => User)
  user: User;
}
