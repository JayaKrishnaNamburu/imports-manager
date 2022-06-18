import { html, useState, useContext } from "haunted";
import { ManagerContext } from "./index.js";

export const Search = () => {
  const { store, manager } = useContext(ManagerContext);
  const [search, _] = useState<string | null>(null);

  const handleSearch = async (depName: string) => {
    if (!depName) {
      store.exports.next(null);
      return;
    }
    const exports = await manager.exports(depName);
    store.exports.next(exports);
  };

  return html`<div>
    <input
      value=${search}
      @change=${(ev: any) => handleSearch(ev.target.value)}
    />
    <button @click=${() => handleSearch(search)}>Search</button>
  </div>`;
};
