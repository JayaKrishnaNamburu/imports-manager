import { html, useState, useContext } from "haunted";
import { ManagerContext } from "./index.js";

export const Search = () => {
  const { store, manager } = useContext(ManagerContext);
  const [search, setSearch] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!search) {
      store.exports.next(null);
      return;
    }
    const exports = await manager.exports(search);
    store.exports.next(exports);
  };

  const handleInstall = async () => {
    await manager.install(search);
    console.log(manager.getImports());
    store.dependencies.next(manager.getImports());
  };

  return html`<div>
    <input value=${search} @change=${(ev: any) => setSearch(ev.target.value)} />
    <button @click=${handleSearch}>Fetch Subpaths</button>
    <button @click=${handleInstall}>Install</button>
  </div>`;
};
