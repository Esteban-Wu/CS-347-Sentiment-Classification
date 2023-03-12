import React, { useState } from "react";
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import '@fontsource/public-sans';

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [emoji, setEmoji] = useState("");
  const EMOJI_MAP = {
    happiness: String.fromCodePoint(0x1F60A),
    sadness: String.fromCodePoint(0x1F625),
    fear: String.fromCodePoint(0x1F628),
    anger: String.fromCodePoint(0x1F621),
    surprise: String.fromCodePoint(0x1F62E),
    disgust: String.fromCodePoint(0x1F922),
  };

  const apiKey = ""; // replace with your actual API key
  const apiUrl = "https://api.openai.com/v1/completions";

  const handleGenerateText = async () => {
    const prompt = `Please categorize the following message into one of these emotions:\n"
      happiness, sadness, fear, anger, surprise, and disgust.\n
      Your answer should be 1 word.\n
      Here is the message: "${inputText}"`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 128,
        temperature: 0,
      }),
    });

    const data = await response.json();
    console.log(data.choices);
    const output = data.choices[0].text.trim().toLowerCase();
    if (output.indexOf(' ') >= 0 || output === "") {
      setOutputText("Sorry, we're unable to predict the sentiment for this message.");
      setEmoji(``);
    } else {
      setOutputText(`We think the sender is feeling ${output}`);
      setEmoji(`: ${EMOJI_MAP[output]}`);
    }
  };

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Typography level="h1">CS 347 Project: Sentiment Prediction</Typography>
      <Typography level="h2">{`${outputText}${emoji}`}</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleGenerateText();
        }}
      >
        <Textarea
          placeholder="Paste your message here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          required
          size="lg"
          sx={{ mb: 2 }}
        />
        <Button type="submit">Predict Sentiment</Button>
      </form>
    </Box>
  );
}

export default App;