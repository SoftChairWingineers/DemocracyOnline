const { Router } = require('express');

const aiRouter = Router();

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
aiRouter.post('/fact', (req, res) => {
  res.sendStatus(200);
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
aiRouter.post('/neutral', (req, res) => {
  res.sendStatus(200);
});

module.exports = aiRouter;
