System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInject(id) {
        return function (target, key) {
            console.log(target);
            let elemento;
            const getter = () => {
                if (!elemento) {
                    console.log(`Buscando ${id} para injetar em ${key}`);
                    elemento = $(id);
                }
                return elemento;
            };
            Object.defineProperty(target, key, {
                get: getter
            });
        };
    }
    exports_1("domInject", domInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
