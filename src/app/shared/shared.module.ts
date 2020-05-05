import { FormsModule } from '@angular/forms';
import { DeadlineBillPipe } from './pipes/deadline-bill.pipe';
import { BillStatusNamePipe } from './pipes/bill-status-name.pipe';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { ThanTodayDirective } from './directive/than-today.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [
        ThanTodayDirective,
        PaypalButtonComponent,
        BillStatusNamePipe,
        DeadlineBillPipe,
        CommonModule,
        FormsModule,],
    declarations: [
        ThanTodayDirective,
        PaypalButtonComponent,
        BillStatusNamePipe,
        DeadlineBillPipe,
        ],
})
export class SharedModule { }
