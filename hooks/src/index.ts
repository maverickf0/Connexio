import express from 'express'
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const app = express();

const PORT = 3000 | 3001 | 3002

app.use(express.json());

//TODO: password logic
app.post(`/hooks/catch/:userId/:zapId`, async(req,res)=>{
    const userId = req.params.userId;
    const zapId=req.params.zapId;
    const body = req.body;
    //transaction in prisma

    await client.$transaction(async(tx)=>{
        //STORE IN DP NEW TRIGGER
        const run = await tx.zapRun.create({
            data:{
                zapId: zapId,
                metadata: body
            }
        })

        await tx.zapRunOutbox.create({
            data:{
                zapRunId:run.id
            }
        })
        //PUSH IT ONTO QUEUE OF KAFKA OR REDIS

    })    

    res.json({
        message:"Webhook received"
    })
})

app.listen(PORT,()=>{
    console.log(`port number is:`, PORT)
})