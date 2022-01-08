import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Message } from "./Message";

@Entity({ name: "users" })
export class User extends BaseEntity {
	@PrimaryColumn()
	uid?: string;

	@Column()
	name: string;

	@Column()
	pass: string;


	@Column({ name: "created_at" })
	createdAt?: Date;

	@Column({ name: "updated_at" })
	updatedAt?: Date;

	@OneToMany(() => Message, message => message.user)
    messages?: Message[];

	
	constructor(
		name: string,
		pass: string,
		uid?: string,
		createdAt?: Date,
		updatedAt?: Date
	) {
		super();
		this.name = name;
		this.pass = pass;
		this.uid = uid;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
    @BeforeInsert()
    private beforeInsert(){
        console.log('before insert');
        this.uid = uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    private beforeUpdate() {
        console.log('before update');
        this.updatedAt = new Date();
    }
}
