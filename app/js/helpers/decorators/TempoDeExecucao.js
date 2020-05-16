System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodo = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (emSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log('-------------------------------');
                console.log(`Parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
                const temp = performance.now();
                const retorno = metodo.apply(this, args);
                const temp2 = performance.now();
                console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O tempo de execução do método ${propertyKey} é ${(temp2 - temp) / divisor}${unidade}`);
                console.log('-------------------------------');
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("tempoDeExecucao", tempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
