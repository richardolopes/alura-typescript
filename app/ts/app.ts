import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

$('.form').submit('submit', controller.adiciona.bind(controller));
