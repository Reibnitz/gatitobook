import { FormGroup } from '@angular/forms';
export function usuarioESenhaIguaisValidator(formGroup: FormGroup){
    const username: string = formGroup.get('userName')?.value ?? '';
    const password: string = formGroup.get('password')?.value ?? '';

    if (username.trim() + password.trim() == '') return null
    return username == password ? { usuarioESenhaIguais: true } : null
}
