const initialState = {
    Dogs: [],
    Tempers: [],
    BreedGroups: [],
    allDogs: [],
    Details: [],
    DogsCreated : []
}

function rootReducer(state = initialState, action){
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                Dogs: action.payload,
                allDogs: action.payload,
                DogsCreated: action.payload
        }
        case "GET_TEMPERS":
            return {
                ...state,
                Tempers: action.payload
        }
        case "GET_BREEDG":
            return {
                ...state,
                BreedGroups: action.payload
        }
        case "FILTER_DOG_BY_TEMPERAMENT":
            let filterDogs =  state.DogsCreated
            let filteredDogs = filterDogs?.filter(dog => dog.Tempers.map(e => e.name)?.includes(action.payload) || dog.Tempers.includes(action.payload));
            if(action.payload === "All") filteredDogs = filterDogs 
            return {
                ...state,
                Dogs: filteredDogs
        }
        case 'FILTER_DOG_BY_BREEDG':
            let filterDogsBG = state.DogsCreated
            let filteredDogsBG = filterDogsBG?.filter(dog => dog.Breed_groups.map(e => e.name)?.includes(action.payload) || dog.Breed_groups.includes(action.payload))
            if(action.payload === 'All') filteredDogsBG = filterDogsBG
            return {
                ...state,
                Dogs: filteredDogsBG
            }
        case "FILTER_DOG_BY_CREATED":
            const filterDogsByCreated =  state.allDogs;
            let filter = action.payload === "db" ? filterDogsByCreated.filter(d => d.fan) : filterDogsByCreated.filter(d => !d.fan)
            if(action.payload === "all") filter = filterDogsByCreated
            return {
                ...state,
                Dogs: filter,
                DogsCreated: filter
        }
        case "FILTER_DOG_BY_NAME": 
            const filterDogByName = state.Dogs;
            let filterName = action.payload === 'asc' ? filterDogByName.sort((a, b) =>{
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) : filterDogByName.sort((a, b) => {
                if(a.name < b.name) return 1
                if(a.name > b.name) return -1
                return 0
            })
            return {
                ...state,
                Dogs: filterName
            }

            case "FILTER_DOG_BY_WEIGHT":
                const filterDogsByWeight =  state.Dogs;
                let filterWeight = action.payload === "weightMin" ? filterDogsByWeight.sort((a, b) => {
                    if(parseInt(a.weightMin) > parseInt(b.weightMin)) return 1
                    if(parseInt(a.weightMin) < parseInt(b.weightMin)) return -1
                    return 0
                }) : filterDogsByWeight.sort((a, b) => {
                    if(parseInt(a.weightMin) < parseInt(b.weightMin)) return 1
                    if(parseInt(a.weightMin) > parseInt(b.weightMin)) return -1
                    return 0
                })
                return {
                    ...state,
                    Dogs: filterWeight
            }
        case "GET_NAME":
            return {
                ...state,
                Dogs: action.payload
        }
        case "POST_DOG":
            return {
                ...state,
            }
        case "REMOVE_DOG":
            return {
                ...state,
            }
        case "GET_DETAIL":
            return {
                ...state,
                Details: action.payload
        }
        case "CLEAR_DETAIL":
            return {
                ...state,
                Details: []
        }
        default:
            return state;
    }
}
export default rootReducer;