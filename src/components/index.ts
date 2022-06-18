import { createContext, component } from "haunted";
import { Subject } from "subjecto";
import { ImportMapManager } from "../manager/index.js";
import { Exports } from "./exports.js";
import { Search } from "./search.js";
import { Dependencies } from "./dependencies.js";

const store = {
  exports: new Subject<string[] | null>(null),
  dependencies: new Subject<Record<string, string> | null>(null),
};

const ManagerContext = createContext({
  manager: new ImportMapManager(),
  store,
});

const registerElements = () => {
  customElements.define("manager-search", component(Search));
  customElements.define("manager-exports", component(Exports));
  customElements.define("manager-dependencies", component(Dependencies));
};

export { ManagerContext, registerElements };
