export function throttle(milissegundos = 500) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodo = descriptor.value;
        let timer = 0;

        descriptor.value = function (...args: any[]) {
            if (event) event.preventDefault();

            clearTimeout(timer);
            timer = setTimeout(() => metodo.apply(this, args), milissegundos)
        }

        return descriptor;
    }
}