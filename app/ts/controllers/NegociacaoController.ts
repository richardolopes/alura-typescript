import { Negociacao } from '../models/Negociacao';
import { Negociacoes } from '../models/Negociacoes';

import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';

import { domInject } from '../helpers/decorators/domInject';

export class NegociacaoController {
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagem = new MensagemView("#mensagemView");

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','))

        if (!this._ehDiaUtil(data)) {
            this._mensagem.update('As negociações só podem ser realizadas em dias úteis');
            return;
        }

        const neg = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(neg);
        this._negociacoesView.update(this._negociacoes);
        this._mensagem.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() !== DiaDaSemana.Sabado || data.getDay() !== DiaDaSemana.Domingo
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}