import React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDogs, getTemperament, getBreedG, filterDogByTemperament, filterDogByCreated, filterDogByName, filterDogByWeight, filterDogByBreedG} from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../../components/cards/cards.jsx';
import NavBar from '../../components/bars/nav/nav.jsx';
import SearchBar from "../../components/bars/search/search.jsx";
import style from './home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.Dogs);
    const allTemperament = useSelector(state => state.Tempers);
    const allBreedGroup = useSelector(state => state.BreedGroups)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogPerPage] = useState(8);
    const indexLastDog = currentPage * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [order, setOrder] = useState('');
    const [charge, setCharge] = useState(false)

    setTimeout(() => {
        console.log(order)
        }, 2592000000)
        
    useEffect(() => {
        setCharge(true);        
        dispatch(getTemperament());
        dispatch(getBreedG());
        dispatch(getDogs());
        setTimeout(() => {
            setCharge(false);
        }, 4000);
    } , [ dispatch ]);

    function handleTemperament(e){
        e.preventDefault()
        dispatch(filterDogByTemperament(e.target.value));
        setCurrentPage(1);
    }

    function handleBreedG(e){
        e.preventDefault()
        dispatch(filterDogByBreedG(e.target.value));
        setCurrentPage(1);
    }

    function handleCreated(e){
        e.preventDefault()
        dispatch(filterDogByCreated(e.target.value));
        setCurrentPage(1);
    }

    function handleName(e){
        e.preventDefault()
        dispatch(filterDogByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(filterDogByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
      }

      const maxPage = Math.ceil(allDogs.length / dogPerPage)
      const pages = [];
      for(let i = 1; i <= Math.ceil(allDogs.length/dogPerPage); i++){
          pages.push(i);
      }

      const handleReset = (e) => {
        e.preventDefault();
        dispatch(getTemperament());
        dispatch(getBreedG());
        dispatch(getDogs());
        document.getElementById('order').value = 'ord';
        document.getElementById('created').value = 'CREATED';
        document.getElementById('temp').value = 'All';
        document.getElementById('breed').value = 'All';
        document.getElementById('weight').value = 'weight';
        document.getElementById('pages').value = 0;
        setTimeout(() => {
          setCurrentPage(1);
        }, 10);
      };

      return (
        <div className={style.contenedor}>
        <NavBar/>
        <SearchBar currentPage = {() => setCurrentPage(1)} />
        <div className={style.innerContenedor}>
        <button type= "submit" onClick={(e) => handleReset(e)} className= {style.button}>Reset</button>
      &nbsp;
            <select id='order' defaultValue="ord" onChange={e => handleName(e)} className= {style.select} >
                <option value="ord" hidden>Alphabetical Order</option>
                <option value = "asc">A - Z</option>
                <option value = "desc">Z - A</option>
            </select>
            <select id='created' defaultValue="CREATED" onChange={e => handleCreated(e)} className= {style.select}>
                <option value="CREATED" hidden >Filter by create</option>
                <option value="all">All</option>
                <option value="api">API only</option>
                <option value="db">DataBase only</option>
            </select>
            <select id='temp' defaultValue = "All" onChange={e => handleTemperament(e)} className= {style.select}>
                <option value="All">Filter by temperament</option>
                {
                    allTemperament?.map(temperament => (
                        <option key={temperament.id} value={temperament.name} >{temperament.name}</option>
                    ))
                }
            </select>
            <select id='breed' defaultValue = "All" onChange={e => handleBreedG(e)} className= {style.select}>
                <option value="All">Filter by Breed Group</option>
                {
                    allBreedGroup?.map(bG => (
                        <option key={bG.id} value={bG.name} >{bG.name}</option>
                    ))
                }
            </select>
            <select id='weight' defaultValue="weight" onChange={e => handleSortWeight(e)} className= {style.select}>
                <option value="weight" hidden>Order by weight</option>
                <option value= "weightMin">Min</option>
                <option value= "weightMax">Max</option>
            </select>
            <select id='pages' defaultValue={0} className= {style.select} onChange={(e) => paginate(e.target.value)} >
            <option value={0} hidden>Go to page</option>
                {pages?.map(n => 
                    <option key={n} value={n}>{n}</option> 
                )}
            </select>
            <div className= {style.pg}>
        <button  onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
          &laquo; Previous
        </button>
        &nbsp;
        <span>Page {currentPage} of {maxPage} </span>
        &nbsp;
        <button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
          Next &raquo;
        </button>
      </div>
            <div className= {style.cardsContainer}>
                        {charge && currentDogs.length === 0 ? 
                        <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="loading"/>:
                    
                    currentDogs?.map(dog => {
                    return (
                        <div key={dog.id}>
                            
                            {
                        <Link to={`/detail/${dog.id}`} className= {style.link}>
                    <Card key={dog.id}
                    name= {dog.name}
                    image= {dog.image}
                    Tempers= {dog.Tempers[0]?.name? dog.Tempers.map(el => el.name +(" ")) : dog.Tempers.map(el => el +(" "))}
                    weightMin= {dog.weightMin}
                    weightMax= {dog.weightMax}
                    id= {dog.id} />
                        </Link>
                            }
                        </div>
                        )})
            } 
            { currentDogs.length === 0 && !charge ?  <h1><br/><br/><br/>No dogs found</h1> : null }
            </div>
            <div className= {style.pg}>
        <button  onClick={()=>{ if(currentPage > 1) paginate(currentPage - 1)}}>
          &laquo; Previous
        </button>
        &nbsp;
        <span>Page {currentPage} of {maxPage} </span>
        &nbsp;
        <button onClick={()=> { if(currentPage < maxPage) paginate(Number(currentPage) + 1)}}>
          Next &raquo;
        </button>
        &nbsp;
        <select id='pages' defaultValue={0} className= {style.select} onChange={(e) => paginate(e.target.value)} >
            <option value={0} hidden>Go to page</option>
                {pages?.map(n => 
                    <option key={n} value={n}>{n}</option> 
                )}
            </select>
      </div>
        </div>
    </div>
      )
}