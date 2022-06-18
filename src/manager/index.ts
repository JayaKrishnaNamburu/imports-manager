import { Generator } from "@jspm/generator";
import { ImportMapService } from "./service.js";

export interface IImportMapManager {
  exports: () => Promise<string[] | null>;
}

export class ImportMapManager {
  generator!: Generator;
  services!: ImportMapService;
  constructor() {
    this.generator = new Generator();
    this.services = new ImportMapService();
  }

  async exports(packageName: string) {
    return this.services.loadExportsForPackage(packageName);
  }

  async install(depName: string) {
    await this.generator.install(depName);
  }

  getImports() {
    try {
      return Object.keys(this.generator.getMap().imports).reduce(
        (acc: Record<string, string>, dep) => {
          const result = this.generator
            .getMap()
            .imports[dep].match(
              /@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/gm
            );
          const version = result?.[0];
          if (!version) {
            throw new Error(`Version missing for the dependency ${dep}`);
          }
          acc[dep] = version;
          return acc;
        },
        {}
      );
    } catch (error) {
      return {};
    }
  }
}
