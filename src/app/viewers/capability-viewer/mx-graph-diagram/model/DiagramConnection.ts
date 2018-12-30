import {DiagramNode} from "./DiagramNode";

export class DiagramConnection {
  source: DiagramNode;
  target: DiagramNode;
  label?: string;
  sourceCardinality?: string;
  targetCardinality?: string;

}
