import { html, useContext, useEffect, useState } from "haunted";
import { ManagerContext } from "./utils.js";

export const Dependencies = () => {
  const { store, manager } = useContext(ManagerContext);
  const [depsList, setDeps] = useState<string[] | null>(null);

  useEffect(() => {
    const deps = manager.getImports();
    setDeps(deps);

    const sub = store.dependencies.subscribe((val) => setDeps(val));

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const hadleUninstall = async (depPath: string) => {
    await manager.uninstall(depPath);
    store.dependencies.next(manager.getImports());
  };

  return html`Dependencies
    <ul>
      ${depsList
        ? depsList.map((depPath) => {
            return html`<li :key="${depPath}">
              <div>${depPath}</div>
              <button @click="${() => hadleUninstall(depPath)}">x</button>
            </li>`;
          })
        : null}
    </ul>`;
};
