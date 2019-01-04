export class ModelUtils {
  static isReadOnly(constraint: fhir.ElementDefinitionConstraint[]) {
    if (constraint) {
      for (let i = 0; i < constraint.length; i++) {
        const constraintElement = constraint[i];
        if (constraintElement.key === 'Readonly') {
          return true;
        }
      }
    }
    return false;
  }

  static computeLevel(path: string): number {
    if (path == null) {
      return 0;
    }
    const match = path.match(/\./g);
    return (match || []).length;
  }
}
