"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const parser_1 = require("./parser");
const email_1 = require("./email");
const TOPIC_NAME = 'zap-events';
const prismaClient = new client_1.PrismaClient();
const kafka = new kafkajs_1.Kafka({
    clientId: 'worker-processor',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = kafka.consumer({ groupId: 'main-worker' });
        yield consumer.connect();
        const producer = kafka.producer();
        producer.connect();
        yield consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
        yield consumer.run({
            autoCommit: false,
            eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (!((_a = message.value) === null || _a === void 0 ? void 0 : _a.toString())) {
                    return;
                }
                const parsedValue = JSON.parse((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString());
                const zapRunId = parsedValue.zapRunId;
                const stage = parsedValue.stage;
                const zapRunDetail = yield prismaClient.zapRun.findFirst({
                    where: {
                        id: zapRunId,
                    },
                    include: {
                        zap: {
                            include: {
                                actions: {
                                    include: {
                                        type: true
                                    }
                                },
                            }
                        }
                    }
                });
                const currentAction = (_c = zapRunDetail === null || zapRunDetail === void 0 ? void 0 : zapRunDetail.zap) === null || _c === void 0 ? void 0 : _c.actions.find(x => x.sortingOrder === stage);
                if (!currentAction) {
                    console.log("Current action not found!");
                    return;
                }
                const zapRunMetadata = zapRunDetail === null || zapRunDetail === void 0 ? void 0 : zapRunDetail.metadata;
                if (currentAction.type.id === "email") {
                    const body = (0, parser_1.parse)((_d = currentAction.metadata) === null || _d === void 0 ? void 0 : _d.body, zapRunMetadata);
                    const to = (0, parser_1.parse)((_e = currentAction.metadata) === null || _e === void 0 ? void 0 : _e.email, zapRunMetadata);
                    yield (0, email_1.sendEmail)(to, body);
                    console.log(`Sending out an Email to ${to} body is ${body}`);
                }
                if (currentAction.type.id === "sol") {
                    const amount = (0, parser_1.parse)((_f = currentAction.metadata) === null || _f === void 0 ? void 0 : _f.amount, zapRunMetadata);
                    const to = (0, parser_1.parse)((_g = currentAction.metadata) === null || _g === void 0 ? void 0 : _g.address, zapRunMetadata);
                    console.log(`Sending out SOL of ${amount} to address ${to}`);
                    // await sendSol(to,amount)
                }
                const lastStage = (((_h = zapRunDetail === null || zapRunDetail === void 0 ? void 0 : zapRunDetail.zap.actions) === null || _h === void 0 ? void 0 : _h.length) || 1) - 1;
                if (lastStage !== stage) {
                    yield producer.send({
                        topic: TOPIC_NAME,
                        messages: [{
                                value: JSON.stringify({
                                    stage: stage + 1,
                                    zapRunId
                                })
                            }]
                    });
                }
                console.log("processing done");
                yield consumer.commitOffsets([{
                        topic: TOPIC_NAME,
                        offset: (parseInt(message.offset) + 1).toString(),
                        partition: partition
                    }]);
            })
        });
    });
}
main();
