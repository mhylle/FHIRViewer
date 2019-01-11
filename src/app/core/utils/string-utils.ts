export class StringUtils {
  static stripUrl(referenceUrl: any) {
    if (referenceUrl === null || referenceUrl === '') {
      return '';
    }
    if (referenceUrl instanceof Array) {
      return referenceUrl[0].split('/').pop();
    }

    return referenceUrl.split('/').pop().trim();
  }

  static computeLevel(path: string): number {
    if (path == null) {
      return 0;
    }
    const match = path.match(/\./g);
    return (match || []).length;
  }

  static computeName(path: string): string {
    if (path == null) {
      return;
    }
    if (!path.match(/\./g)) {
      return path;
    }

    const finalDotPosition = path.lastIndexOf('.');
    return path.substring(finalDotPosition + 1, path.length);
  }
}
