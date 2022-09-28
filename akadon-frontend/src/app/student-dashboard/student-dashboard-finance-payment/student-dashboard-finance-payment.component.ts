import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var paypal: any;
@Component({
  selector: 'app-student-dashboard-finance-payment',
  templateUrl: './student-dashboard-finance-payment.component.html',
  styleUrls: ['./student-dashboard-finance-payment.component.css'],
})
export class StudentDashboardFinancePaymentComponent implements OnInit {
  constructor() {}

  public payPalConfig: any;
  public showPaypalButtons!: boolean;
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'assets/couch.jpg',
  };

  paidFor = false;

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
