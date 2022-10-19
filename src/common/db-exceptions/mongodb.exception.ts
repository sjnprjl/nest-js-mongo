import { MongooseError } from "mongoose";
import { IDBException } from "./exception.interface";

const DUBLICATE_KEY_CODE = 11000;

export class MongoDBException implements IDBException {
	isDublicate(exception: any): boolean {
		return exception.code === DUBLICATE_KEY_CODE;
	}
	instanceNotFound(exception: MongooseError): boolean {
		return (exception.constructor.name === "CastError");
	}

}
