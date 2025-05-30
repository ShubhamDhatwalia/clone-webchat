import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keywords: JSON.parse(localStorage.getItem('keywords')) || [],
};

const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      state.keywords.push(action.payload);
      localStorage.setItem('keywords', JSON.stringify(state.keywords));
    },
    updateKeyword: (state, action) => {
      const { index, updatedKeyword } = action.payload;
      state.keywords[index] = updatedKeyword;
      localStorage.setItem('keywords', JSON.stringify(state.keywords));
    }
    ,
    removeKeyword: (state, action) => {
      state.keywords.splice(action.payload, 1);
      localStorage.setItem('keywords', JSON.stringify(state.keywords));
    },
    editKeyword: (state, action) => {
      const { oldKeyword, newKeyword } = action.payload;
      const index = state.keywords.findIndex(k => JSON.stringify(k) === JSON.stringify(oldKeyword));
      if (index !== -1) {
        state.keywords[index] = newKeyword;
        localStorage.setItem('keywords', JSON.stringify(state.keywords));
      }
    },
   

  },
});

export const { addKeyword, removeKeyword, editKeyword, updateKeyword, addReplyToKeyword, removeReplyFromKeyword } = keywordSlice.actions;
export default keywordSlice.reducer;
