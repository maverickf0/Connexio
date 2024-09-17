require("dotenv").config();

import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const TOPIC_NAME = 'zap-events'
const prismaClient = new PrismaClient();

const kafka = new Kafka({
    clientId:'worker-processor',
    brokers:['localhost:9092']
});



async function main(){

    const consumer = kafka.consumer({groupId:'main-worker'});
    await consumer.connect()

    const producer = kafka.producer()
    producer.connect();

    await consumer.subscribe({topic:TOPIC_NAME, fromBeginning:true})

    await consumer.run({
        autoCommit:false,
        eachMessage:async ({topic, partition, message}) => {
            
            if(!message.value?.toString()){
                return;
            }

            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;
            const stage = parsedValue.stage

            const zapRunDetail = await prismaClient.zapRun.findFirst({
                where:{
                    id: zapRunId,
                },
                include:{
                    zap:{
                        include:{
                            actions: {
                                include:{
                                    type: true
                                }
                            },
                        }
                    }
                }
            })

            const currentAction = zapRunDetail?.zap?.actions.find(x => x.sortingOrder === stage)


            if(!currentAction){
                console.log("Current action not found!")
                return;
            }
            const zapRunMetadata = zapRunDetail?.metadata;

            if(currentAction.type.id === "email"){
                const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
                const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
                await sendEmail(to, body);
                console.log(`Sending out an Email to ${to} body is ${body}`)
            }

            if(currentAction.type.id === "sol"){
                const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
                const to = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
                console.log(`Sending out SOL of ${amount} to address ${to}`)
                // await sendSol(to,amount)
            }

            const lastStage = (zapRunDetail?.zap.actions?.length || 1) - 1;

            if(lastStage !== stage){
                await producer.send({
                    topic:TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            }

            console.log("processing done")
            await consumer.commitOffsets([{
                topic:TOPIC_NAME,
                offset:(parseInt(message.offset) + 1).toString(),
                partition:partition
            }])
        }

    })

}

main();