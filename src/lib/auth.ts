import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDb from "./db"
import { User } from "@/model/user.model"
import bcrypt from "bcryptjs"


const authOptions:NextAuthOptions={
    providers:[ // login kamne korbo 
        // Cradential provider / email,pass provider
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:'Email' ,type:'text'},
                password:{label:'Password', type:'password'}
            },
           async authorize(credentials, req){
                let email= credentials?.email 
                let password= credentials?.password
                if(!email || !password){
                    throw new Error("email or password is not found")
                }

                await connectDb()
                let existUser = await User.findOne({email})
                
                if(!existUser){
                    throw new Error("user not found")
                }

               let isMatch = await bcrypt.compare(password,existUser.password)
               if(!isMatch){
                throw new Error("incorrect Password")
               }

               return {
                id: existUser._id.toString(),
                name: existUser.name,
                email: existUser.email,
                image: existUser.image
               }
            }
        }),

        // Google provider
       

    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.id= user.id 
                token.name= user.name
                token.email= user.email
                token.image = user.image
            }
            return token

        },

        // session a user details add
        session({session, token}){
            if(session.user){
                session.user.id =token?.id as string
                session.user.name= token?.name
                session.user.email = token?.email
                session.user.image = token?.image as string
            }

            return session
        }
    },
    session:{
        strategy: 'jwt',
        maxAge: 30*24*60*60*1000
    },
    pages:{
        signIn: '/login',
        error: '/login'
    },
    secret:process.env.NEXT_AUTH_SECRET
}

export default authOptions
