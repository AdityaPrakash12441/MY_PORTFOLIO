import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) throw new Error("groq api is not present");

const client = new Groq({
    apiKey
});

export default client;
