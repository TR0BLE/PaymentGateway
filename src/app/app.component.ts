import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AngularStripeProject';
  paymentHandler = null;
  constructor() {}

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JbhjpSAsOIdsG9BpNn0iDQMnAf9EaJWidUyZ7KokqOrVBn5wVwIhfhSY5rh8Ol2FJFVh7bvSYQQQPnFfAGq2hVm00PWXdwPVp',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated');
      },
    });

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JbhjpSAsOIdsG9BpNn0iDQMnAf9EaJWidUyZ7KokqOrVBn5wVwIhfhSY5rh8Ol2FJFVh7bvSYQQQPnFfAGq2hVm00PWXdwPVp',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successful!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
