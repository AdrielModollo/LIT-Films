import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import User from "./User";

@Entity("rentals")
export default class Rental {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    movie_id: number;

    @Column()
    user_id: string;

    @Column({ default: () => "now()" })
    rental_date: Date;

    @ManyToOne(() => User, user => user.rentals)
    @JoinColumn({ name: "user_id" })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
