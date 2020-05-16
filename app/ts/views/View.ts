import { tempoDeExecucao } from '../helpers/decorators/TempoDeExecucao';

export abstract class View<T> {
    protected _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar = false) {
        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    @tempoDeExecucao(true)
    update(model: T): void {
        let template = this.template(model)
        if (this._escapar)
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        this._elemento.html(template);
    }

    abstract template(model: T): string;

}
