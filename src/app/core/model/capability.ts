import {Operation} from './operation';

export class Capability {
  rest: any;
  type: string;
  profile: string;
  read: boolean;
  vread: boolean;
  update: boolean;
  patch: boolean;
  delete: boolean;
  history_instance: boolean;
  history_type: boolean;
  create: boolean;
  search_type: boolean;
  read_history: boolean;
  update_create: boolean;
  conditionalCreate: boolean;
  conditionalRead: string;
  conditionalUpdate: boolean;
  conditionalDelete: boolean;
  operations: Operation[];
}
