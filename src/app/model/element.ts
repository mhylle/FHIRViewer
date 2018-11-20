import {Type} from './Type';
import {Mapping} from './mapping';
import {Binding} from './binding';

export class Element {
  id: string | number;
  path: string;
  short: string;
  definition: string;
  alias: string[];
  min: number;
  max: string;
  mapping: Mapping[];
  type: Type[];
  binding: Binding;
  comment: string;
  isModifier: boolean;
  isSummary: boolean;
}
