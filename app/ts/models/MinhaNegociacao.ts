import { Imprimivel } from "./Imprimivel";
import { Igualavel } from "./Igualavel";

export interface MinhaNegociacao<T> extends Imprimivel, Igualavel<T> {

}