import {Extension} from './extension';

export class Binding {
  extension: Extension[];
  strength: string;
  description: string;
  valueSetReference: {
    reference: string;
  };
}
