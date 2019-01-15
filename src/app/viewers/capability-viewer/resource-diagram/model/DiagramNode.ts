import {DiagramConnection} from './DiagramConnection';
import {DiagramNodeElement} from './DiagramNodeElement';

export class DiagramNode {
  isParent: boolean;
  title: string;
  min: fhir.unsignedInt;
  max: string;
  short: string;
  path: string;
  connection: DiagramConnection;
  elements: DiagramNodeElement[];
  readOnly: boolean;
}
