import { llamaApi } from "../api"


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
        
        const res = await llamaApi.post('', newMessage);

        const {text} = res?.data.choices[0];


        let title = 'New chat';

        if(text){

            const resTitle = await llamaApi.post('', getChatTitle);

            const {text} = resTitle?.data.choices[0];

            title = text || 'New chat';

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