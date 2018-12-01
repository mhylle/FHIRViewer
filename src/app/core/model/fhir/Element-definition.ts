import {Coding} from './Coding';
import {SlicingElement} from './slicing-element';
import {BaseElement} from './base-element';
import {TypeElement} from './type-element';
import {ExampleElement} from './example-element';
import ElementDefinitionConstraint = fhir.ElementDefinitionConstraint;

export class ElementDefinition {
  path: string;
  representation?: string[];
  sliceName?: string;
  label?: string;
  code?: Coding[];
  slicing?: SlicingElement;
  short?: string;
  definition?: string;
  comment?: string;
  requirements?: string;
  alias?: string[];
  min?: number;
  max?: string;
  base?: BaseElement;
  contentReference?: string;
  type?: TypeElement[];
  defaultValue?: any;
  meaningWhenMissing?: string;
  orderMeaning?: string;
  fixed?: any;
  pattern?: any;
  example?: ExampleElement[];
  minValue?: any;
  maxValue?: any;
  maxLength?: number;
  condition?: string;
  constraint: ElementDefinitionConstraint;

}
