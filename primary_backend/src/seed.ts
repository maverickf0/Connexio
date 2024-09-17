import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main(){
    await prismaClient.availableTrigger.create({
        data:{
            id:"webhook",
            name: "Webhook",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo_Eqn2QifO8Vfcv5fZdLuwDfaUgxkyxd8qQ&s",
        }
    })

    await prismaClient.availableAction.create({
        data:{
            id: "sol",
            name:"Send Solana",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTOOhDi1KrwwS7G_H1yvSkMoiPhO3anGP8_w&s"
        }
    })

    await prismaClient.availableAction.create({
        data:{
            id: "email",
            name:"Send Email",
            image:"https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
        }
    })
}

main();