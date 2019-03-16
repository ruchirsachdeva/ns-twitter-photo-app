import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ToastService {

    constructor(private toastr: ToastrService) {
    }

    showSuccess(message: string, title?: string) {
        this.toastr.success(message, title);
    }


    show(message: string, title?: string) {
        this.toastr.show(message, title);
    }

    showError(message: string, title?: string) {
        this.toastr.error(message, title);
    }

    showInfo(message: string, title?: string) {
        this.toastr.info(message, title);
    }

    showWarning(message: string, title?: string) {
        this.toastr.warning(message, title);
    }
}
