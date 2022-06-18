import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  signingOut: boolean;
  sideMenu: boolean;
  addNewBoardCard: boolean;
  cardDetailsModel: boolean;
  addNewMember: boolean;
  coverModel: boolean;
  labelModel: boolean;
  listId: string;
  addNewCard: boolean;
  addNewList: boolean;
  currentList: string;
  deleteCommentSnackBar: boolean;
}

const initialState = {
  signingOut: false,
  sideMenu: false,
  addNewBoardCard: false,
  cardDetailsModel: false,
  addNewMember: false,
  coverModel: false,
  labelModel: false,
  addNewCard: false,
  addNewList: false,
  deleteCommentSnackBar: false,
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
    saveListId(state, action) {
      state.listId = action.payload;
    },
    toggleListModel(state, action) {
      state.addNewList = action.payload;
    },
    toggleNewCard(state, action) {
      state.addNewCard = action.payload;
    },
    setCurrentList(state, action) {
      state.currentList = action.payload;
    },
    toggleDeleteCommentSnackbar(state) {
      state.deleteCommentSnackBar = !state.deleteCommentSnackBar;
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
  toggleListModel,
  toggleNewCard,
  saveListId,
  setCurrentList,
  toggleDeleteCommentSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer;
