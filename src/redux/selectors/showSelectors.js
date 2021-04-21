export const getFetchStatus = (state) => {
  return {
    fetching: state.show.fetching,
    fetched: state.show.fetched
  }
}

export const isFetching = (state) => state.show.fetching;

export const isFetched = (state) => state.show.fetched;