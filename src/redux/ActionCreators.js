import * as ActionTypes from "./ActionTypes";

export const addComment = (campsiteId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    campsiteId: campsiteId, // OR
    rating, // in ES6 when identifier is same as value
    author, // pass like this
    text, // Shorthand property names
  },
});
