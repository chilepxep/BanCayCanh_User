import clientPromise from '@/lib/mongodb'
//import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'



export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_FRONT_ID,
            clientSecret: process.env.GOOGLE_FRONT_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
}

export default NextAuth(authOptions)