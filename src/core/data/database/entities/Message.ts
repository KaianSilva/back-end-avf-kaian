import {BaseEntity,	BeforeInsert, BeforeUpdate,	Column,	Entity,	JoinColumn,	ManyToOne,	OneToOne, PrimaryColumn} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


@Entity({ name: "messages" })
export class Message extends BaseEntity {
	@PrimaryColumn()
	uid?: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({ name: "created_at" })
	createdAt?: Date;

	@Column({ name: "updated_at" })
	updatedAt?: Date;

	@ManyToOne(() => User, (user) => user.messages)
	@JoinColumn({ name: "user_uid" })
	user: User;

	

	constructor(
		title: string,
		description: string,
		user: User,
		uid?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super();
		this.title = title;
		this.description = description;
		this.user = user;
		this.uid = uid;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	@BeforeInsert()
	private beforeInsert() {
		console.log("before insert");
		this.uid = uuid();
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	@BeforeUpdate()
	private beforeUpdate() {
		console.log("before update");
		this.updatedAt = new Date();
	}
}
