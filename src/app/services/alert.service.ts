import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AlertService {
success(title: string, text?: string) {
Swal.fire(title, text || '', 'success');
}
error(title: string, text?: string) {
Swal.fire(title, text || '', 'error');
}
info(title: string, text?: string) {
Swal.fire(title, text || '', 'info');
}
confirm(title: string, text?: string) {
return Swal.fire({ title, text, icon: 'question', showCancelButton: true, confirmButtonText: 'Sí', cancelButtonText: 'No' });
}
}
