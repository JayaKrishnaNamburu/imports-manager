import { getPackageConfig, lookup } from "@jspm/generator";
import path from "path-browserify";

export class ImportMapService {
  async loadExportsForPackage(depName: string): Promise<string[] | null> {
    try {
      const { resolved } = await lookup(depName);
      const packageJSON = await getPackageConfig(resolved);

      return Object.keys(packageJSON?.exports || {}).map((subPath) => {
        if (subPath === ".") {
          return `${packageJSON.name}@${packageJSON.version}`;
        }
        return path.join(`${packageJSON.name}@${packageJSON.version}`, subPath);
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
