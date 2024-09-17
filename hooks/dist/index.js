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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 3000 | 3001 | 3002;
app.use(express_1.default.json());
//TODO: password logic
app.post(`/hooks/catch/:userId/:zapId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    //transaction in prisma
    yield client.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        //STORE IN DP NEW TRIGGER
        const run = yield tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });
        yield tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
        //PUSH IT ONTO QUEUE OF KAFKA OR REDIS
    }));
    res.json({
        message: "Webhook received"
    });
}));
app.listen(PORT, () => {
    console.log(`port number is:`, PORT);
});
