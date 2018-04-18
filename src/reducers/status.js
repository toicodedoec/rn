export const initialState = {
  loading: false,
  info: null,
  error: null,
  success: null,
};

export default function appReducer(state = initialState, action) {console.log(action.type);
  switch (action.type) {
    case 'STATUS_REPLACE': {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || null,
        error: action.error || null,
        success: action.success || null,
      };
    }
    default:
      return state;
  }
}
