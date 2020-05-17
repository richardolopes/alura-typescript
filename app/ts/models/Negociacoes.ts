import { Negociacao } from './Negociacao';
import { MinhaNegociacao } from './MinhaNegociacao';

export class Negociacoes implements MinhaNegociacao<Negociacoes> {
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao> {
        return ([] as Negociacao[]).concat(this._negociacoes);
    }

    paraTexto(): void {
        console.log(JSON.stringify(this._negociacoes));
    }

    ehIgual(negs: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negs.paraTexto());
    }
}