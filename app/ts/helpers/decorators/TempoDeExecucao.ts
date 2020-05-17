export function tempoDeExecucao(emSegundos = false) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodo = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let unidade = 'ms';
            let divisor = 1;

            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            const temp = performance.now()
            const retorno = metodo.apply(this, args);
            const temp2 = performance.now()

            console.log('-------------------------------');
            console.log(`O tempo de execução do método '${propertyKey}()' é ${(temp2 - temp) / divisor}${unidade}`);
            console.log('-------------------------------');

            return retorno;
        }

        return descriptor;
    }
}