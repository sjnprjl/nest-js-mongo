export interface IDBException {
	instanceNotFound(exception: any): boolean;
	isDublicate(exception: any): boolean;
}
