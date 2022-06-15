import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  signingOut: boolean;
  sideMenu: boolean;
  addNewBoardCard: boolean;
  cardDetailsModel: boolean;
  addNewMember: boolean;
  coverModel: boolean;
  labelModel: boolean;
}

const initialState = {
  signingOut: false,
  sideMenu: false,
  cardDetailsModel: false,
  addNewMember: false,
  coverModel: false,
  labelModel: false,
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
    toggleCardDetailsModel(state) {
      state.cardDetailsModel = !state.cardDetailsModel;
    },
    toggleAddNewMember(state) {
      state.addNewMember = !state.addNewMember;
    },
    toggleCoverModel(state) {
      state.coverModel = !state.coverModel;
    },
    toggleLabelModel(state) {
      state.labelModel = !state.labelModel;
    },
  },
});

export const {
  hideSignoutFeedback,
  showSignoutFeedback,
  toggleSideMenu,
  toggleAddNewBoardCard,
  toggleCardDetailsModel,
  toggleAddNewMember,
  toggleCoverModel,
  toggleLabelModel,
} = uiSlice.actions;

export default uiSlice.reducer;
