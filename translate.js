import axios from 'axios';

const API_URL = 'https://libretranslate.de/translate';

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source: 'en', // Source language is English
      target: targetLang,
      format: 'text'
    });
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation Error:', error);
    return text; // Return original text on error
  }
};
