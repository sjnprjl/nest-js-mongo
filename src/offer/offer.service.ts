import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from './entities/offer.entitiy';
import { DeleteResult, UpdateResult } from 'mongodb';

@Injectable()
export class OfferService {
	constructor(
		@InjectModel(Offer.name) private readonly offerModel: Model<Offer>,
	) { }


	async findOne(id: string): Promise<Offer> {
		return await this.offerModel.findById(id);
	}

	async find(): Promise<Offer[]> {
		return await this.offerModel.find();
	}

	async create(createDto: any): Promise<Offer> {
		return await this.offerModel.create(createDto);

	}

	async update(id: string, updateDto: any): Promise<UpdateResult> {
		return await this.offerModel.updateOne({
			_id: id,
		}, updateDto);
	}

	async delete(id: string): Promise<DeleteResult> {
		return await this.offerModel.deleteOne({ _id: id });
	}
}
