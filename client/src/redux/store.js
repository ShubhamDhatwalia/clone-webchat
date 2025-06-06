import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './templateSlice.js';
import phoneNumberReducer from './phoneNumberSlice.js';
import campaignReducer from './Campaign/campaignSlice.js';
import ChatbotReducer from './Chatbot/ChatbotSlice..js';
import ContactReducer from './contacts/contactSlice.js';
import ReplyMaterialSlice from './ReplyMaterial/ReplyMaterialSlice.js';
import keywordReducer from './Keywords/keywordsSlice.js'
import chatbotsReducer from './Chatbot/chatbotsSlice.js'

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    phoneNumbers: phoneNumberReducer,
    campaign: campaignReducer,
    chatbot: ChatbotReducer,
    contact: ContactReducer,
    replyMaterial: ReplyMaterialSlice,
    keywords: keywordReducer,
    chatbots: chatbotsReducer,
  },
});


export default store; 