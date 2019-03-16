import {Injectable} from '@angular/core';
import {Feedback, FeedbackType, FeedbackPosition} from 'nativescript-feedback';

@Injectable()
export class ToastService {
    private feedback: Feedback;

    constructor() {
        this.feedback = new Feedback();
    }

    show(message: string, title?: string) {
        this.feedback.show({
            title: title,
            message: message
        });
    }

    showSuccess(message: string, title?: string) {
        this.feedback.success({
            title: title,
            message: message
        });
    }

    showError(message: string, title?: string) {
        this.feedback.error({
            title: title,
            message: message
        });
    }

    showInfo(message: string, title?: string) {
        this.feedback.info({
            title: title,
            message: message
        });
    }

    showWarning(message: string, title?: string) {
        this.feedback.warning({
            title: title,
            message: message
        });
    }
}
