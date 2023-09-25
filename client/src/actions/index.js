import axios from "axios";
import Swal from 'sweetalert2';

export function getDogs(){
    return async function(dispatch){
        const response = await axios.get("https://dogs-project-production.up.railway.app/dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: response.data
        })
    }
}

export function getTemperament(){
    return async function(dispatch){
        const response = await axios.get("https://dogs-project-production.up.railway.app/tempers")
        return dispatch({
            type: "GET_TEMPERS",
            payload: response.data
        })
    }
}
export function getBreedG(){
    return async function(dispatch){
        const response = await axios.get("https://dogs-project-production.up.railway.app/breed_groups")
        return dispatch({
            type: "GET_BREEDG",
            payload: response.data
        })
    }
}
export function getName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`https://dogs-project-production.up.railway.app/dogs?name=${name}`)
            return dispatch({
                type: "GET_NAME",
                payload: response.data
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: 'Dog dont found'
            })
        }
    }
}
export function PostDog(payload){
    return async function(){
        try{
            const response = await axios.post("https://dogs-project-production.up.railway.app/dogs", payload)
            return response
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'Cant create dog',
                footer: 'See if name is in use!'
            })
        }
    }
}
export function filterDogByTemperament(payload){
    return {
        type: "FILTER_DOG_BY_TEMPERAMENT",
        payload
    }
}
export function filterDogByBreedG(payload){
    return {
        type: "FILTER_DOG_BY_BREEDG",
        payload
    }
}
export function filterDogByCreated(payload){
    return {
        type: "FILTER_DOG_BY_CREATED",
        payload
    }
}

export function filterDogByName(payload){
    return {
        type: "FILTER_DOG_BY_NAME",
        payload
    }
}
export function filterDogByWeight(payload){
    return {
        type: "FILTER_DOG_BY_WEIGHT",
        payload
    }
}

export function getDetail(id) {
    return async function(dispatch){
        try{
        const response = await axios.get(`https://dogs-project-production.up.railway.app/dogs/${id}`)
        return dispatch({
            type: "GET_DETAIL",
            payload: response.data
        })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: 'Dog info dont found, see if that dog exist first.'
            })
        }
    }
}

export function removeDog(id){
    return async function(dispatch){
        try{        
        const response = await axios.delete(`https://dogs-project-production.up.railway.app/deleted/${id}`);
        return dispatch({
            type: "REMOVE_DOG",
            payload: response.data
        })}
        catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: 'Cant delete dog',
                footer: 'Check if dog id is correct, and try again'
            })
        }
    }
}

export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}