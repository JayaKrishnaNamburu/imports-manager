import { html, useContext, useEffect, useRef, useState } from "haunted";
import { ManagerContext } from "./utils.js";

export const Exports = () => {
  const ref = useRef<HTMLElement>(null);
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

  const handlePathSelect = async (ev: any) => {
    const selectedPath = ev.target.closest("[data-path]")?.dataset["path"];
    if (!selectedPath) {
      return;
    }
    context.store.isDependencyInstalling.next(true);
    await context.manager.install(selectedPath);
    context.store.isDependencyInstalling.next(false);
    context.store.dependencies.next(context.manager.getImports());
  };

  return html`<ul :ref="${ref.current}">
    ${exports?.length > 0
      ? exports.map(
          (depPath) => html`<li
            @click="${handlePathSelect}"
            data-path=${depPath}
          >
            ${depPath}
          </li>`
        )
      : null}
  </ul>`;
};
