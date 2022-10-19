import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Public } from 'src/common/decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { DeleteResult, UpdateResult } from 'mongodb';

@Public() // TODO: remove this
@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) { }

	@Post()
	create(@Body() input: CreateCategoryDto): Promise<Category & { _id: ObjectId }> {
		return this.categoryService.create(input);
	}

	@Get()
	findAll(): Promise<Category[]> {
		return this.categoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string): Promise<Category> {
		return this.categoryService.findOneOrThrow(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateDto: UpdateCategoryDto): Promise<UpdateResult> {
		return this.categoryService.update(id, updateDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string): Promise<DeleteResult> {
		return this.categoryService.delete(id);
	}
}
