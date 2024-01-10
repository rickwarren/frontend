import { api } from "../../api";
import { Message } from "./dto/message.dto";

async function getMessages(userId: string | undefined, userId2: string): Promise<Message[]> {
    const results = await api.get('http://localhost:3005/messages/' + userId + '/' + userId2);
    return results.data;
}

async function createMessage(message: any): Promise<Message> {
    const result = await api.post('http://localhost:3005/messages', message);
    return result.data;
}

async function updateMessage(message: any): Promise<Message> {
    const result = await api.put('http://localhost:3005/messages', message);
    return result.data;
}

async function deleteMessage(id: string): Promise<boolean> {
    const result = await api.delete('http://localhost:3005/messages/' + id);
    return result.data;
}

export {
    getMessages,
    createMessage,
    updateMessage,
    deleteMessage
}