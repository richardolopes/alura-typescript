export function domInject(id: string) {
    return function (target: any, key: string) {
        let elemento: JQuery;
        const getter = () => {
            if (!elemento) {
                console.log(`Buscando ${id} para injetar em ${key}`)
                elemento = $(id);
            }

            return elemento;
        }

        Object.defineProperty(target, key, {
            get: getter
        });
    }
}