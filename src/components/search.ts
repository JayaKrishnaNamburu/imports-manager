import { html, useState, useContext } from "haunted";
import { ManagerContext } from "./utils.js";

export const Search = () => {
  const { store, manager } = useContext(ManagerContext);
  const [search, setSearch] = useState<string | null>("react@17.0.2");

  const handleSearch = async () => {
    if (!search) {
      store.exports.next(null);
      return;
    }
    const exports = await manager.exports(search);
    store.exports.next(exports);
  };

  const handleInstall = async () => {
    store.isDependencyInstalling.next(true);
    await manager.install(search);
    store.dependencies.next(manager.getImports());
    store.isDependencyInstalling.next(false);
  };

  return html`<div>
    <input value=${search} @change=${(ev: any) => setSearch(ev.target.value)} />
    <button @click=${handleSearch}>Exports</button>
    <button @click=${handleInstall}>Install</button>
  </div>`;
};
