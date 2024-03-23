import { MercadoPagoConfig, Payment } from "mercadopago";
import { env } from "~/env";

export const mercadopago = new MercadoPagoConfig({
  accessToken: env.MERCADOPAGO_ACCESS_TOKEN,
});

export const paymentApi = new Payment(mercadopago);
