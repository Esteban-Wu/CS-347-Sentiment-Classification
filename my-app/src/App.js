import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [emoji, setEmoji] = useState("");
  const EMOJI_MAP = {
    Happiness: String.fromCodePoint(0x1F60A),
    Sadness: String.fromCodePoint(0x1F625),
    Fear: String.fromCodePoint(0x1F628),
    Anger: String.fromCodePoint(0x1F621),
    Surprise: String.fromCodePoint(0x1F62E),
    Disgust: String.fromCodePoint(0x1F922),
  };

  const apiKey = ""; // replace with your actual API key
  const apiUrl = "https://api.openai.com/v1/completions";

  const handleGenerateText = async () => {
    const prompt = `Please categorize the following message into one of these emotions:\n"
      Happiness, Sadness, Fear, Anger, Surprise, and Disgust.\n
      Your answer should be 1 word.
      Here is the message: ${inputText}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 128,
        temperature: 0,
      }),
    });

    const data = await response.json();
    console.log(data.choices);
    const output = data.choices[0].text.trim()
    setOutputText(output);
    setEmoji(EMOJI_MAP[output]);
  };

  return (
    <div>
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleGenerateText}>Generate Text</button>
      </div>
      <div>
        <p>{`${outputText}: ${emoji}`}</p>
      </div>
    </div>
  );
}

export default App;