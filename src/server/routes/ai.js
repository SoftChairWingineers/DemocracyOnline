const fs = require('fs/promises');
const path = require('path');
const { Router } = require('express');
const { GoogleGenAI } = require('@google/genai');

const aiRouter = Router();
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_KEY });

const factsPath = path.resolve(__dirname, 'aiRules', 'facts.txt');
let factsRule;
fs.readFile(factsPath, { encoding: 'utf8' })
  .then((contents) => {
    factsRule = contents;
  })
  .catch((error) => {
    console.error('Failed to read facts rule file: ', error);
  });

/*
  POST /api/ai/fact
    - Send message in request body { message }
    - AI reads message and corrects facts if needed
      - Aim to keep message as similar as possible to original message
    - AI should respond with:
      - Corrected message
      - Statement about what was corrected
    - Set status 200 for correct transaction
    - Respond with an object
      - factCheckedMessage
      - factCheckStatement
*/
aiRouter.post('/fact', async (req, res) => {
  if (!req.body.message) {
    res.sendStatus(400); // There must be a message on the request body.
  } else {
    try {
      const { text } = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `
          ${factsRule}
          Message: ${req.body.message}
        `,
      });
      const splitText = text.split('*****');
      let factCheckedMessage = splitText[2].slice(1, -2);
      let factCheckedStatement = splitText[4].slice(1, -1);

      res.status(200).send({ factCheckedMessage, factCheckedStatement });
    } catch (error) {
      console.error('Failed to POST /api/ai/fact ', error);
      res.sendStatus(500);
    }
  }
});

const neutralPath = path.resolve(__dirname, 'aiRules', 'neutral.txt');
let neutralRule;
fs.readFile(neutralPath, { encoding: 'utf8' })
  .then((contents) => {
    neutralRule = contents;
  })
  .catch((error) => {
    console.error('Failed to read facts rule file: ', error);
  });

/*
  POST /api/ai/neutral
    - Sends message in request body { message }
    - AI reads message and neutralizes it from harsh statements to make it more digestible
      - Aim to keep message as similar as possible to the original message without altering facts
    - AI should respond with:
      - Neutralized message
      - Statement about how it has been neutralized
    - Set Status 200 for correct transaction
    - Respond with an object:
      - neutralMessage
      - neutralStatement
*/
aiRouter.post('/neutral', async (req, res) => {
  if (!req.body.message) {
    res.sendStatus(400); // There must be a message on the request body.
  } else {
    try {
      const { text } = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `
          ${neutralRule}
          Message: ${req.body.message}
        `,
      });
      const splitText = text.split('*****');
      let neutralMessage = splitText[2].slice(1, -2);
      let neutralStatement = splitText[4].slice(1, -1);

      res.status(200).send({ neutralMessage, neutralStatement });
    } catch (error) {
      console.error('Failed to POST /api/ai/fact ', error);
      res.sendStatus(500);
    }
  }
});

module.exports = aiRouter;
