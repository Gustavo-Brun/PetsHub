const { GoogleGenAI } = require('@google/genai');
const chatIA = new GoogleGenAI({ apiKey: process.env.BOBIA_KEY });

function generateAnswer(req, res) {
  const { pet, tutor, reviews, prompt } = req.body;

  chatIA.models
    .generateContent({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `${process.env.BOBIA_CTX} 
            Informações do Pet: ${JSON.stringify(pet)}; 
            Informações do Tutor do Pet: ${JSON.stringify(tutor)}; 
            Reviews/Comentários feitos sobre o Pet: ${JSON.stringify(reviews)};
        `
      },
      contents: prompt
    })
    .then((data) => {
      const response = data.text;
      const tokens = data.usageMetadata;

      console.log(response);
      console.log('Token usage: ', tokens);

      res.status(200).json({ response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
}

module.exports = {
  generateAnswer
};
