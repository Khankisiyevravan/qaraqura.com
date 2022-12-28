let initialState = {
  uploadShowR: false,
  uploadSolutionShowR: false,
  burgerShowR: false,
  thanksShowR: false,
  solutionPopUp: false,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "Show_Upload":
      return { ...state, uploadShowR: true };
    case "Hidden_Upload":
      return { ...state, uploadShowR: false };
    case "Show_Upload_Solution":
      return { ...state, uploadSolutionShowR: true };
    case "Hidden_Upload_Solution":
      return { ...state, uploadSolutionShowR: false };
    case "Show_Burger":
      return { ...state, burgerShowR: true };
    case "Hidden_Burger":
      return { ...state, burgerShowR: false };
    case "Show_Thanks":
      return { ...state, thanksShowR: true };
    case "Hidden_Thanks":
      return { ...state, thanksShowR: false };
    case "Show_Details_PopUp":
      return { ...state, solutionPopUp: true };
    case "Hidden_Details_PopUp":
      return { ...state, solutionPopUp: false };
    default:
      return state;
  }
}
