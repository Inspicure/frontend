import {getSubscriptions, joinHallway} from "app/api";

export const actionTypes = {
    updateHallwayMemberships: 'UPDATE_HALLWAYS_MEMBERSHIP',
    setLoading: 'SET_LOADING',
    addHallwayMembership: "ADD_HALLWAY_MEMBERSHIP",
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
        case actionTypes.addHallwayMembership:
            return {...prevState, hallwayMemberships: prevState.hallwayMemberships.concat([action.payload.newHallway]), isLoading: false}
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

export const addHallwayMembership = (payload) => {
    return {type: actionTypes.addHallwayMembership, payload}
}


// thunk action creators
export const retrieveAndSaveHallwayMemberships = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        const retrievedHallways = await getSubscriptions();
        if (retrievedHallways) {
            dispatch(updateHallwayMemberships({hallwayMemberships: retrievedHallways}));
        }
    }
}

export const joinHallwayAndUpdateMemberships = (hallwayId) => {
    return async (dispatch) => {
        dispatch(setLoading());
        const joinedHallway = await joinHallway(hallwayId)
        if (joinedHallway) {
            dispatch(addHallwayMembership({newHallway: joinedHallway}))
        }
    }
}