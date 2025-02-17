import { delay } from "framer-motion";
import { llamaApi } from "../api"


const maxRetries = 5;
const baseDelay = 1000;


const fetchWithRetry = async(payload, retries = maxRetries, delay = baseDelay) => {

    for (let i = 0; i < retries; i++) {
        try {
            const res = await llamaApi.post('', payload);
            return res.data;
        } catch (error) {
            if(error.response?.status === 429) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                throw error;
            }
        }
    };

    throw new Error('Exceeded max retries. API limit reached');
};







export const createAnswer = async(message) => {

    const newMessage = {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
        messages: [{
            role: 'user',
            content: message
        }],
        temperature: 0.4,
        top_p: 1
    };


    const getChatTitle = {
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
        messages: [{
            role: 'user',
            content: `Create a very brief title for this text using only 3 or 4 words, the title must be in the lenguage of the text: ${message}`
        }],
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1
    };

    try {
        
       const res = await fetchWithRetry(newMessage);

        const text = res?.choices?.[0]?.text || 'No response received';


        let title = 'New chat';

        if(text){

            const resTitle = await fetchWithRetry(getChatTitle);


            title = resTitle?.choices?.[0].text || 'New chat';

        }

        return {
            text,
            title
        }


    } catch (error) {
        console.error(error);
        return {
            ok: false,
            msg: 'Error in request',
        }
    }
}