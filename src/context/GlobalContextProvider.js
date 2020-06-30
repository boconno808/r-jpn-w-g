import React from 'react'

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();


const initialState = {
  loadingWords: true,
  loadingJpn: true,
  error: false,
  loadingText: '',
  hideLoading: false,
}

function reducer(state, action) {
  switch(action.type){
    case 'LOADING_WORDS': {
      return {
        ...state,
        loadingText: 'Picking the perfect word...',
        hideLoading: false,
      }
    }
    case 'LOADING_TRANS': {
      return {
        ...state,
        loadingWords: false,
        loadingText: 'Translating...'
      }
    }
    case 'RELOAD' : {
      return {
        loadingWords: true,
        loadingJpn: true,
        error: false,
        loadingText: '',
        hideLoading: false,
      }
    }
    case 'RESULT' : {
      return {
        ...state,
        hideLoading: true,
        loadingJpn: false,
      }
    }
    case 'ERROR' : {
      return {
        ...state,
        hideLoading: true,
        loadingJpn: false,
        loadingText: false,
        error: true,
      }
    }
    default:
      throw new Error('Bad Action Type')
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider;
