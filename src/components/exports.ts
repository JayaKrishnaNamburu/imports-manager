import { html, useContext, useEffect, useState } from "haunted";
import { ManagerContext } from "./index.js";

export const Exports = () => {
  const context = useContext(ManagerContext);
  const [exports, setExports] = useState<string[] | null>(null);

  useEffect(() => {
    const sub = context.store.exports.subscribe((value) => {
      setExports(value);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return html`<ul>
    ${exports?.length > 0
      ? exports.map((depPath) => html`<li :key=${depPath}>${depPath}</li>`)
      : null}
  </ul>`;
};
