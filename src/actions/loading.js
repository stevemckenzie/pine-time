export const setLoading = (loading) => async (dispatch) =>
  dispatch({
    loading: loading ? 1 : -1,
    type: 'SET_LOADING',
  });
