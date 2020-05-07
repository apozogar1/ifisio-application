import { INumDoc } from 'app/shared/model/num-doc.model';

export interface ICompanya {
  id?: number;
  nombre?: string;
  numDocs?: INumDoc[];
}

export class Companya implements ICompanya {
  constructor(public id?: number, public nombre?: string, public numDocs?: INumDoc[]) {}
}
