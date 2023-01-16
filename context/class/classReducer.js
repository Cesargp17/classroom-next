export const classReducer = ( state, action ) => {
    switch ( action.type ) {

        case '[Class] - Cargar':
            return {
                ...state, Clases: [...action.payload]
            }

        case '[Class] - Unirse':
            return {
                ...state, Clases: [...state.Clases, action.payload]
            }
    
        default:
            return state;
    }
}