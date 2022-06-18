import { html, useContext, useEffect, useState } from "haunted";
import { ManagerContext } from "./index.js";

export const Dependencies = () => {
  const context = useContext(ManagerContext);
  const [depsList, setDeps] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const deps = context.manager.getImports();
    setDeps(deps);

    const sub = context.store.dependencies.subscribe((val) => {
      setDeps(val);
      console.log(val);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return html`Dependencies
    <ul>
      ${depsList
        ? Object.keys(depsList).map((dep) => {
            return html`<li :key=${dep}>${dep}${depsList[dep]}</li>`;
          })
        : null}
    </ul>`;
};
