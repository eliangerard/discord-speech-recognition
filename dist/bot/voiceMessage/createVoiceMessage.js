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
const audio_1 = require("../../utils/audio");
const voiceMessage_1 = __importDefault(require("../voiceMessage"));
exports.default = ({ client, bufferData, user, connection, speechOptions, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!connection.joinConfig.channelId)
        return undefined;
    const stereoBuffer = Buffer.concat(bufferData);
    const monoBuffer = (0, audio_1.convertStereoToMono)(stereoBuffer);
    const duration = (0, audio_1.getDurationFromMonoBuffer)(monoBuffer);
    if (duration < 1 || duration > 19)
        return undefined;
    let content;
    let error;
    try {
        content = yield ((_a = speechOptions.speechRecognition) === null || _a === void 0 ? void 0 : _a.call(speechOptions, monoBuffer, speechOptions));
    }
    catch (e) {
        error = e;
    }
    const channel = client.channels.cache.get(connection.joinConfig.channelId);
    if (!channel || !channel.isVoiceBased())
        return undefined;
    return new voiceMessage_1.default({
        client,
        data: {
            author: user,
            duration,
            audioBuffer: stereoBuffer,
            content,
            error,
            connection,
        },
        channel,
    });
});
//# sourceMappingURL=createVoiceMessage.js.map