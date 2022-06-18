import { createContext } from "haunted";
import { Subject } from "subjecto";
import { ImportMapManager } from "../manager/index.js";

const store = {
  exports: new Subject<string[] | null>(null),
  dependencies: new Subject<string[] | null>(null),
  isDependencyInstalling: new Subject<boolean>(null),
  selectedPaths: new Subject<string[] | null>(null),
};

const ManagerContext = createContext({
  manager: new ImportMapManager(),
  store,
});

export { ManagerContext };
