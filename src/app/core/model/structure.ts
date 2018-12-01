import {Entry} from './entry';

export class Structure {
  id: string;
  name: string;
  type: string;
  url: string;
  baseDefinition: string;
  definition: string;
  snapshot: any;
  entries: Entry[];
  differential: any;
}
