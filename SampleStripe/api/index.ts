import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(`${process.env.API_KEY}`, {
  apiVersion: '2020-08-27',
  typescript: true,
});

const app = express();
app.use(express.json());

app.post('/get-card-token', async (req, res) => {
  const {fullName, cardNumber, expMonth, expYear, cvc} = req.body;

  const token = await stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
      name: fullName,
    },
  });

  res.send({
    tokenId: token.id,
  });
});

app.post('/charge', async (req, res) => {
  const {tokenId} = req.body;

  const charge = await stripe.charges.create({
    amount: 3000,
    currency: 'usd',
    source: tokenId,
    description: 'subscription to my youtube channel',
  });
  res.send({
    status:
      charge.status === 'succeeded'
        ? 'Payment is successful'
        : 'Payment is unsuccessful, please try again!',
  });
});

app.get('/pkey', (_, res) => {
  const publishableKey = process.env.PUBLISHABLE_KEY;
  res.send({
    publishableKey: publishableKey ?? '',
  });
});

app.listen(3000, () => console.log('listening port 3000!'));
