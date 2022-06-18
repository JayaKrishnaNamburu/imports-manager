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
    try {
      await this.generator.install(depName);
    } catch (e) {
      console.log(e);
    }
  }

  async uninstall(depName: string) {
    const deps = this.getImports().filter((dep) => dep !== depName);
    this.generator = new Generator();
    for (let i = 0; i < deps.length; i++) {
      await this.generator.install(deps[i]);
    }
  }

  getImports(): string[] {
    try {
      return this.parseDepsIntoJSPMRedable(
        Object.keys(this.generator.getMap().imports).reduce(
          (acc: Record<string, string>, dep) => {
            const result = this.generator
              .getMap()
              .imports[dep].match(
                /@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta|next))*)/gm
              );
            const version = result?.[0];
            if (!version) {
              throw new Error(`Version missing for the dependency ${dep}`);
            }
            acc[dep] = version;
            return acc;
          },
          {}
        )
      );
    } catch (error) {
      return [];
    }
  }

  parseDepsIntoJSPMRedable(deps: Record<string, string>): string[] {
    return Object.keys(deps).map((dep) => {
      const name = dep.split("/");
      if (dep.startsWith("@")) {
        if (name.length === 3) {
          return `${name.splice(0, 2).join("/")}${deps[dep]}/${name
            .splice(3, name.length - 1)
            .join("/")}`;
        }
        return `${name.splice(0, 1).join("/")}${deps[dep]}/${name
          .splice(2, name.length - 1)
          .join("/")}`;
      } else {
        if (name.length === 1) {
          return `${name[0]}${deps[dep]}`;
        }
        return `${name[0]}${deps[dep]}/${name
          .splice(1, name.length - 1)
          .join("/")}`;
      }
    });
  }
}
