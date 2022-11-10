import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
    const valor: string = control.value;
    if (valor !== valor.toLowerCase()){
        return { minusculo: true }
    }

    return null;
}
