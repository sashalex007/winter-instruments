import dotenv from 'dotenv'
dotenv.config()

export const stripeKey = process.env.STRIPE_KEY 
export const easypostKey = process.env.EASYPOST_KEY 
export const domain = process.env.DOMAIN
export const port = process.env.PORT
