import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Card from "../cards/cards";
import { PostDog, getTemperament, getBreedG } from '../../actions';
import style from './form.module.css';
import Swal from 'sweetalert2';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';


const regex = /^[a-zA-ZñÑ]+$/

function validate(dog){

    const errors = {};
    if(!dog.name){
        errors.name = 'Name is required'
    }
    if(dog.name && !regex.test(dog.name)){
        errors.name = 'Name must be letters only'
    }
    if(dog.origin && !regex.test(dog.origin)){
        errors.origin = 'Origin must be letters only'
    }
    if(dog.bred_for && !regex.test(dog.bred_for)){
        errors.bred_for = 'bred for, must be letters only'
    }
    if(!dog.weightMax || !dog.weightMin){
        errors.weightMax = "Weight is required";
    }
    if(!dog.heightMax || !dog.heightMin){
        errors.heightMax = "Height is required";
    }
    if(!dog.life_ageMax || !dog.life_ageMin){
        errors.lifespan = "Life span is required";
    }
    if(Number(dog.weightMax) < Number(dog.weightMin)){
        errors.weightMax = "Weight max must be greater than weight min";
    }
    if(Number(dog.heightMax) < Number(dog.heightMin)){
        errors.heightMax = "Height max must be greater than height min";
    }
    if(Number(dog.life_ageMax) < Number(dog.life_ageMin)){
        errors.lifespan = "Life span max must be greater than life span min";
    }
    if(dog.heightMax === "0" || dog.heightMin === "0"){
        errors.heightMax = "Height max and min must be greater than 0";
    }
    if(dog.weightMax === "0" || dog.weightMin === "0"){
        errors.weightMax = "Weight max and min must be greater than 0";
    }
    if(dog.life_ageMax === "0" || dog.life_ageMin === "0"){
        errors.weightMax = "Life span max and min must be greater than 0";
    }
    if(Number(dog.weightMin) < 0 || Number(dog.weightMax) < 0){
        errors.weightMax = "Weight max and min must be positive numbers";
    }
    if(Number(dog.heightMin) < 0 || Number(dog.heightMax) < 0){
        errors.heightMax = "Height max and min must be positive numbers";
    }
    if(Number(dog.life_ageMin) < 0 || Number(dog.life_ageMax) < 0){
        errors.lifespan = "Life span max and min must be positive numbers";
    }

    return errors;
}

export default function DogsCreate(){
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.Tempers);
    const breedgroups = useSelector(state => state.BreedGroups);
    const history = useHistory();
    const [dog, setDog] = useState({
        name: "",
        bred_for:'',
        origin:"",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_ageMax: "",
        life_ageMin: "",
        image: "",
        Tempers:[],
        Breed_groups:[],
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        dispatch(getTemperament());
        dispatch(getBreedG());
    }, [dispatch]);

    function handleChange (e){
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...dog,
            [e.target.name]: e.target.value
        }))
    }
    // async function handleUpChage(e){
    //     let urlImg = URL.createObjectURL(e.target.files[0]);
        
    //     setDog({
    //         ...dog,
    //         [e.target.name]: urlImg
    //     })
    
    function handleSelect(e){
        const temperament = e.target.value;
        if(!dog.Tempers.includes(temperament)){
            if(dog.Tempers.length >= 8){
                return  Swal.fire({
                        icon: 'error',
                        title: 'Error 412',
                        text: 'Dog cant have more than eight temperaments',
                        footer: '<a target="_blank" rel="noopener noreferrer" href="https://www.akc.org/akctemptest/what-is-temperament/">What is temperament?</a>'
                      })
                }
            setDog({
                ...dog,
                Tempers: [...dog.Tempers, temperament]
            })
        }
    }
    function handleSelectBG(e){
        const bg = e.target.value;
        if(!dog.Breed_groups.includes(bg)){
            if(dog.Breed_groups.length >= 1){
            return  Swal.fire({
                    icon: 'error',
                    title: 'Error 412',
                    text: 'Dog cant have more than one breed group',
                    footer: '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Dog_breed">What is dog breed?</a>'
                  })
            }
            setDog({
                ...dog,
                Breed_groups: [...dog.Breed_groups, bg]
            })
        }
    }
    function handleSubmit (e){
        e.preventDefault();
       let errors = validate(dog);
        if(!errors.name && !errors.weightMax && !errors.lifespan && !errors.heightMax && !errors.origin && !errors.bred_for){
        dispatch(PostDog(dog));
        Swal.fire({
            icon: 'success',
            title: 'Dog created successfully',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          .then(
            history.push('/home')
          )
    }
        else{
            setErrors(validate({...dog}));
            return Swal.fire({
            icon: 'error',
            title: 'Cant create dog',
            text: 'You have errors, resolve it and try again!',
            footer:'button will get lock until all errors be resolved'
            })
        }
    }
    function handleDelete(el) {
        setDog({
            ...dog,
            Tempers: dog.Tempers.filter(t => t !== el)
        })
    }
    function handleDeleteBG(el) {
        setDog({
            ...dog,
            Breed_groups: dog.Breed_groups.filter(bg => bg !== el)
        })
    }
        
    return (
        <div className= {style.parent}>
            <div className= {style.boton}>
            <Link to="/home" className= {style.link}><button className= {style.myButton}>Go back</button></Link>
            </div>
            <div className= {style.form}>
                <div className= {style.tittle}>
                    <h1>Create your dog</h1>
                </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <h3 className= {style.tittle2}>Name</h3>
                    <input type="text" value= {dog.name} name= "name" placeholder="Insert Name" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.name && <p className= {style.errors}>{errors.name}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Origin</h3>
                    <input type="text" value= {dog.origin} name= "origin" placeholder="Where is from..." onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.origin && <p className= {style.errors}>{errors.origin}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Bred for</h3>
                    <input type="text" value= {dog.bred_for} name= "bred_for" placeholder="Purpose / used for" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.bred_for && <p className= {style.errors}>{errors.bred_for}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Height</h3>
                    <input type="number" min='1' max='999' value= {dog.heightMin} name= "heightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMin && <p className= {style.errors}>{errors.heightMin}</p>}
                    <input type="number" min='1' max='999' value= {dog.heightMax} name= "heightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.heightMax && <p className= {style.errors}>{errors.heightMax}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Weight</h3>
                    <input type="number" min='1' max='999' value= {dog.weightMin} name= "weightMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMin && <p className= {style.errors}>{errors.weightMin}</p>}
                    <input type="number" min='1' max='999' value= {dog.weightMax} name= "weightMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.weightMax && <p className= {style.errors}>{errors.weightMax}</p>}
                </div>
                <div>
                <h3 className= {style.tittle2}>Life Span</h3>
                    <input type="number" min='1' max='999' value= {dog.life_ageMin} name= "life_ageMin" placeholder="Min" onChange={(e) => handleChange(e)} className= {style.input}/>
                    <input type="number" min='1' max='999' value= {dog.life_ageMax} name= "life_ageMax" placeholder="Max" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {errors.lifespan && <p className= {style.errors}>{errors.lifespan}</p>}
                </div>
                <div>
                    <h3 className= {style.tittle2}>Image</h3>
                    <input type="text" value= {dog.image} id='output' name= "image" placeholder="Insert Image" onChange={(e) => handleChange(e)} className= {style.input}/>
                    {/* <input type="file" accept="image/*" style={{ display: 'none' }} id="contained-button-file"  name= "image" onChange={(e) => handleUpChage(e)}/>
                    <label htmlFor="contained-button-file"><IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton></label> */}
                </div>
                <select onChange={(e) => handleSelect(e)} className= {style.select}>
                    <option value= "Select" hidden>Select Temperament</option>

                    {
                        temperaments.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                        ))
                    }
                </select>
                <select onChange={(e) => handleSelectBG(e)} className= {style.select}>
                    <option value= "Select" hidden>Select Breed Group</option>

                    {
                        breedgroups?.map(bG => (
                            <option key={bG.id} value={bG.name} >{bG.name}</option>
                        ))
                    }
                </select>
                {Object.keys(errors).length === 0 ? (<div><button type="submit" className= {style.buttonCreate2}>Create Dog</button></div>) : (<div><button type="submit" disabled = {true} className= {style.buttonCreate}>Create Dog </button></div>)}
            </form>
        </div>
        <div className= {style.card}>
            <Card
                name={dog.name}
                heightMin={dog.heightMin}
                heightMax={dog.heightMax}
                weightMin={dog.weightMin}
                weightMax={dog.weightMax}
                life_spanMax={dog.life_spanMax}
                life_spanMin={dog.life_spanMin}
                image={dog.image ? dog.image : "https://icon-library.com/images/insert-image-icon/insert-image-icon-14.jpg"}
                Tempers={dog.Tempers}
            />
        </div>
        <br/>
        <div className={style.TaBcont}>
        <div className= {style.tempers}>
            {dog.Tempers.map(el => <div key= {el+Math.random()} className= {style.divtempers}><p>{el}</p><button onClick={() => handleDelete(el)} className= {style.buttonDelete}>Delete</button></div>)}
        </div>
        <br/>
        <div className= {style.breedG}>                
            {dog.Breed_groups.map(el => <div key= {el+Math.random()} className= {style.divtempers}><p>{el}</p><button onClick={() => handleDeleteBG(el)} className= {style.buttonDelete}>Delete</button></div>)}
        </div>
        </div>
    </div>
    )
}