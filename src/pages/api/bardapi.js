
const { palm_key, model_name } = require("@/secret.key");
const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = model_name;
const API_KEY = palm_key;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});





export default function handler(req, res) {
    let messages = [{ content: req.query.ques }];
  
client.generateMessage({
  model: MODEL_NAME,
  temperature: 0.25,
  candidateCount: 1,
  top_k: 40,
  top_p: 0.95,
  prompt: {
    messages: messages,
  },
}).then(result => {
    console.log("First Response:", result[0].candidates[0]?.content);

    messages.push({ content: result[0].candidates[0]?.content });
   // console.log(JSON.stringify(result, null, 2));
    res.status(200).json({ resp: messages })
});
}