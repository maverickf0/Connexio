import { Router } from "express";
import { authMiddleware } from "../authMiddleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from "../config";

const router = Router();

router.post('/signup',async (req,res)=>{
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username
        }
    })


    if(userExists){
        return res.status(403).json({
            message:"User already Exists"
        })
    }

    await prismaClient.user.create({
        data:{
            email:parsedData.data.username,
            //TODO: hash the password
            password:parsedData.data.password,
            name:parsedData.data.name
        }
    })
    // TODO:await sendEmail
    return res.status(200).json({
        message:"Please verify your account"
    })
})

router.post('/signin',async (req,res)=>{
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect input"
        })
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    })

    if(!user){
        return res.status(403).json({
            message:"Sorry credentials are incorrect"
        })
    }

    //sigin jwt

    const token = jwt.sign({
        id:user.id,
    },JWT_PASSWORD)


    res.json({
        token:token
    })


})


router.get('/',async(req,res)=>{
    //TODO: Fix the type
    //@ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where:{
            id:id
        },
        select:{
            name:true,
            email:true
        }
    });

    return res.json({
        user
    })
})


export const userRouter = router;