import { MinhaNegociacao } from "./MinhaNegociacao";

export class Negociacao implements MinhaNegociacao<Negociacao> {
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number) { }

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
            Volume: ${this.volume}`
        )
    }

    ehIgual(neg: Negociacao): boolean {
        return this.data.getDate() == neg.data.getDate() &&
            this.data.getMonth() == neg.data.getMonth() &&
            this.data.getFullYear() == neg.data.getFullYear();
    }
}