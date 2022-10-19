import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DeleteResult, UpdateResult } from 'mongodb';
import { IDBException } from 'src/common/db-exceptions/exception.interface';
import { MongoDBException } from 'src/common/db-exceptions/mongodb.exception';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	private mongoException: IDBException;
	constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {
		this.mongoException = new MongoDBException();
	}

	async findOneOrThrow(id: string): Promise<Category> {
		try {
			const category: Category = await this.categoryModel.findOne({
				_id: id,
			});
			return category;

		} catch (err) {
			if (this.mongoException.instanceNotFound(err)) {
				throw new BadRequestException('category cannot be found');
			}
		}
	}

	async findAll(): Promise<Category[]> {
		return this.categoryModel.find();

	}

	async create(input: CreateCategoryDto): Promise<Category & { _id: ObjectId }> {
		input?.parent && await this.findOneOrThrow(input.parent);
		try {
			return await this.categoryModel.create(input);
		} catch (err) {
			if (this.mongoException.isDublicate(err)) {
				throw new BadRequestException('same category already exist');
			} else {
				console.log(err)
				throw new BadRequestException("something went wrong.")
			}
		}
	}

	async update(id: string, updateDto: UpdateCategoryDto): Promise<UpdateResult> {
		return this.categoryModel.updateOne({ _id: id }, updateDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return this.categoryModel.deleteOne({ _id: id });
	}

}
