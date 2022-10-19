import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Offer } from './entities/offer.entitiy';
import { OfferService } from './offer.service';
import { DeleteResult, UpdateResult } from 'mongodb';

@Controller('offer')
export class OfferController {
	constructor(private readonly offerService: OfferService) { }

	@Get()
	findAll(): Promise<Offer[]> {
		return this.offerService.find();
	}

	@Get(":id")
	findOne(@Param('id') id: string): Promise<Offer> {
		return this.offerService.findOne(id);
	}

	@Post()
	create(@Body() createDto: any): Promise<Offer> {
		return this.offerService.create(createDto);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateDto: any): Promise<UpdateResult> {
		return this.offerService.update(id, updateDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string): Promise<DeleteResult> {
		return this.offerService.delete(id);
	}

}
