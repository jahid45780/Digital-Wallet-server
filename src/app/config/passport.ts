import passport from "passport";
import { VerifyCallback } from "passport-google-oauth2";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../modular/user/user.model";
import  bcrypt  from 'bcryptjs';


passport.use(
    new localStrategy({
        usernameField:"email",
        passwordField:"password"
    }, async (email:string, password:string, done:VerifyCallback)=>{
        try {
            const isUserExist = await User.findOne({email});
            if(!isUserExist){
                return done (null, false ,{message:"user does not exist"})
              }

              const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

              if(!isPasswordMatched){
                return done(null, false,{message:"password  does  not  match"})
              }

              return done(null, isUserExist)

        } catch (error) {
            console.log(error);
            done(error)
        }
    }
)
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user:any, done:(err:any, id?:unknown)=>void)=>{
    done(null, user._id)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser( async (id:string, done:any)=>{
      try {
        const user = await User.findById(id)
        done(null, user)
      } catch (error) {
         done(error)
      }
})