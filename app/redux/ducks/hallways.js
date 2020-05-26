import {getSubscriptions} from "app/api";

export const actionTypes = {
    updateHallwayMemberships: 'UPDATE_HALLWAYS_MEMBERSHIP',
    setLoading: 'SET_LOADING',
};

export const initialState = {
    hallwayMemberships: [],
    isLoading: false,
};

export default (prevState = initialState, action) => {
    switch (action.type) {
        case actionTypes.updateHallwayMemberships:
            return {...prevState, hallwayMemberships: action.payload.hallwayMemberships, isLoading: false}
        case actionTypes.setLoading:
            return {...prevState, isLoading: true}
        default:
            return {...prevState}
    }
}

// action creators
export const setLoading = () => {
    return { type: actionTypes.setLoading };
  };

export const updateHallwayMemberships = (payload) => {
    return {type: actionTypes.updateHallwayMemberships, payload}
}


// thunk action creators
export const retrieveAndSaveHallwayMemberships = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        const retrievedHallways = await getSubscriptions();
        console.log(retrievedHallways)
        if (retrievedHallways) {
            dispatch(updateHallwayMemberships({hallwayMemberships: retrievedHallways}));
        }
    }
}