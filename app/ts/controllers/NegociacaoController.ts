import { Negociacao } from '../models/Negociacao';
import { Negociacoes } from '../models/Negociacoes';

import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';

import { domInject, throttle, imprime } from '../helpers/index';

import { NegociacaoService, HandlerFunction } from '../services/NegociacaoService'

let timer = 0;

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

    private _negociacaoService = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(500)
    adiciona() {
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

        imprime(neg, this._negociacoes);

        this._negociacoesView.update(this._negociacoes);
        this._mensagem.update('Negociação adicionada com sucesso!');
    }

    private _ehDiaUtil(data: Date): boolean {
        return data.getDay() !== DiaDaSemana.Sabado || data.getDay() !== DiaDaSemana.Domingo
    }

    @throttle(500)
    importaDados() {
        const isOK: HandlerFunction = (res: Response) => {
            if (res.ok) {
                return res;
            } else {
                throw new Error(res.statusText);
            }
        }

        this._negociacaoService
            .obterNegociacoes(isOK)
            .then(negociacoesParaImportar => {
                const negociacoesJaImportadas = this._negociacoes.paraArray();

                negociacoesParaImportar
                    .filter(negociacao => !negociacoesJaImportadas.some(
                        jaImportada => negociacao.ehIgual(jaImportada)))
                    .forEach(
                        negociacao => this._negociacoes
                            .adiciona(negociacao)
                    );
                this._negociacoesView.update(this._negociacoes)
            });
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