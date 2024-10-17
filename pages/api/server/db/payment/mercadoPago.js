import { Payment, MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: "<ACCESS_TOKEN>" });
const payment = new Payment(client);

payment
  .create({
    body: {
      transaction_amount: 17,
      description: "pagamento de teste",
      payment_method_id: "pix",
      payer: {
        email: "ddiegerferanndes@gmail.com",
        identification: {
          type: "CPF",
          number: "4944908687",
        },
      },
    },
    requestOptions: { idempotencyKey: "uiefohjisjfsjeofujs" },
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
