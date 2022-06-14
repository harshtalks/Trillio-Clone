import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  signingOut: boolean;
  sideMenu: boolean;
  addNewBoardCard: boolean;
}

const initialState = {
  signingOut: false,
  sideMenu: false,
} as InitialState;

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    hideSignoutFeedback: (state) => {
      state.signingOut = false;
    },
    showSignoutFeedback(state) {
      state.signingOut = true;
    },
    toggleSideMenu(state) {
      state.sideMenu = !state.sideMenu;
    },
    toggleAddNewBoardCard(state) {
      state.addNewBoardCard = !state.addNewBoardCard;
    },
  },
});

export const {
  hideSignoutFeedback,
  showSignoutFeedback,
  toggleSideMenu,
  toggleAddNewBoardCard,
} = uiSlice.actions;

export default uiSlice.reducer;
