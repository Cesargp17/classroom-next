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
        
        case '[Class] - CargarAnuncios':
            return {
                ...state, Posts: [...action.payload]
            }

        case '[Class] - Crear':
            return {
                ...state, Posts: [...state.Posts, action.payload]
            }

        case '[Class] - Limpiar':
            return {
                ...state, Posts: []
            }

        case '[Class] - CargarAlumnos':
            return {
                ...state, Alumnos: [...action.payload]
            }
    
        default:
            return state;
    }
}