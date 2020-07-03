export const setFavorite = (id, favorite) => async (dispatch) =>
  dispatch({
    id,
    type: favorite ? 'FAVORITE_ADD' : 'FAVORITE_REMOVE',
  });
