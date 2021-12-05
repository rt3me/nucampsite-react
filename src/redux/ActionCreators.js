import * as ActionTypes from "./ActionTypes";
import { CAMPSITES } from "../shared/campsites";

export const addComment = (campsiteId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    campsiteId: campsiteId, // OR
    rating, // in ES6 when identifier is same as value
    author, // pass like this
    text, // Shorthand property names
  },
});

export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  setTimeout(() => {
    dispatch(addCampsite(CAMPSITES));
  }, 2000);
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess,
});

export const addCampsite = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITE,
  payload: campsites,
});
