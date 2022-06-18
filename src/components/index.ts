import { component } from "haunted";
import { Exports } from "./exports.js";
import { Search } from "./search.js";
import { Dependencies } from "./dependencies.js";

const registerElements = () => {
  customElements.define("manager-search", component(Search));
  customElements.define("manager-exports", component(Exports));
  customElements.define("manager-dependencies", component(Dependencies));
};

export { registerElements };
