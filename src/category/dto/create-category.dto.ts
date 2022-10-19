import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ICategory } from '../entities/category.entity';

export class CreateCategoryDto implements Omit<ICategory, 'parent'> {
	@ApiProperty({ type: 'string', required: true, example: 'Science' })
	@IsString()
	name: string;

	@ApiProperty({ type: 'string', required: false, example: 'some-id' })
	@IsString()
	@IsOptional()
	parent?: string;
}
