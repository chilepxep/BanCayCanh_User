import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';
const endpointSecret = "whsec_803d321370a78e22b1eb35c1ef1a1f6eb6718b80e6cffa1a507c80891710a6b1";

export default async function handler(req, res) {
    await mongooseConnect();
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId;
            const paid = data.payment_status === 'paid';
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send('Thanh toán thành công');

}


export const config = {
    api: { bodyParser: false }
}


//attune-wieldy-merry-daring
//acct_1O6B1JI1PK8sIg2u