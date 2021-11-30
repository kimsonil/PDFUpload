import  * as actionTypes from './actions';
import { BooksType } from './types';
import { AxiosError } from 'axios';

type State = {
  loading: boolean;
  data: BooksType[] | null;
  error: AxiosError | null;
};

const initiaState = {
  loading: false,
  data: null,
  error: null
};

export default function users(
  state: State = initiaState,
  action: actionTypes.GetBooksActionsType
): State {
  switch (action.type) {
    case actionTypes.BOOK_PAGE_INIT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case actionTypes.BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
      case actionTypes.BOOK_CREATE_INIT:
        return {
          ...state,
          loading: true,
        }
      case actionTypes.BOOK_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload
        }
      case actionTypes.BOOK_CREATE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error
        }   
    case actionTypes.BOOK_UPDATE_INIT:
      return {
        ...state,
        loading: true,
        
      }
    case actionTypes.BOOK_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case actionTypes.BOOK_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
      case actionTypes.BOOK_DELETE_INIT:
        return {
          ...state,
          loading: true,
        }  
    case actionTypes.BOOK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    case actionTypes.BOOK_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}
