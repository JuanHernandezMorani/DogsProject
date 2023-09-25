import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './search.css'
import { getName } from '../../../actions';
import Swal from 'sweetalert2';

export default function SearchBar({currentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        if(name.length < 1){
        return Swal.fire({
         icon: 'error',
         title: 'Error 411',
         text: 'Put something to search'
         })
        }
        e.preventDefault();
        dispatch(getName(name));
        setName('');
        setTimeout(() => {currentPage(1)},10);
    }



    return (
        <div className='sb'>
            <input type='text' placeholder='Search...' onChange={(e) => handleChange(e)} value= {name} />
            &nbsp;
            <button type= "submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}