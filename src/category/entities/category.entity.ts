import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document } from 'mongoose';


export interface ICategory {
	name: string;
	parent?: ICategory;
}

@Schema()
export class Category extends Document implements ICategory {
	@Prop({ required: true, unique: true, })
	name!: string;

	@Prop({ type: ObjectId, ref: 'Category', required: false })
	parent?: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
