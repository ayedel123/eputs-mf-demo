import { useEffect } from "react";

export const useRemoteBootstrap = (
    remoteUrl: string,
    scope: string,
    moduleName: string,
    containerId: string,
) => {
    useEffect(() => {
        const loadAndRender = async () => {
            try {
                // Загружаем скрипт, если нужно
                if (!window[scope]) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement("script");
                        script.src = remoteUrl;
                        script.async = true;
                        script.onload = resolve;
                        script.onerror = () =>
                            reject(new Error(`Failed to load ${remoteUrl}`));
                        document.head.appendChild(script);
                    });
                }

                // Получаем фабрику модуля
                const container = window[scope];
                const factory = await container.get(`./${moduleName}`);
                const module = factory();

                // Вызываем render из remote
                if (typeof module.render === "function") {
                    module.render(containerId);
                } else {
                    throw new Error(
                        "Remote module does not export render function",
                    );
                }
            } catch (err) {
                console.error("Failed to load remote:", err);
            }
        };

        loadAndRender();
    }, [remoteUrl, scope, moduleName, containerId]);
};
