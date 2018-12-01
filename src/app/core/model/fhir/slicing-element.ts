import {DiscriminatorElement} from './discriminator-element';

export class SlicingElement {
  discriminator?: DiscriminatorElement[];
  description?: string;
  ordered?: boolean;
  rules: string;
}
