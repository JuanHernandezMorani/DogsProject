import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail, removeDog } from '../../actions';
import { Link, useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './dog.css'

export default function Detail(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
        return () => {
            dispatch(clearDetail());
        }
    } , [ dispatch, id]);

    const dog = useSelector(state => state.Details);

    const handleDelete = () => {
        const id = dog.id;
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: true
        })
        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete',
          cancelButtonText: 'No, cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(removeDog(id));
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Dog deleted successfully',
              'success'
            )
            history.push("/home");
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Action canceled successfully',
              'error'
            )
          }
        })
    };

    return (
        <div className='container'>
            <Link to="/home"><button className='bt'>Back to home</button></Link>
            <br/>
            {
                dog.id ?
                    <div className='inner'>
                        <h1>{dog.name}</h1>
                        <img src={dog.image} alt={dog.name} width="200px" height="250px"/>
                        <h4> Temperaments: &lt;&nbsp;{dog.Tempers.map(d => d.name + (' '))}&gt;</h4>
                        <h4> Breed Group: {dog.Breed_groups.map(d => d.name)} </h4>
                        <p className='p'><b>Origin:</b> {dog.origin}</p>
                        <p className='p'><b>Bred for:</b> {dog.bred_for}</p> 
                        <p className='p'><b>Height:</b> from: {dog.heightMin}cm <br/> to: {dog.heightMax}cm</p>
                        <p className='p'><b>Weight:</b> from: {dog.weightMin}Kg <br/> to: {dog.weightMax}Kg</p>
                        <p className='p'><b>Life Span:</b> from: {dog.life_ageMin} years <br/> to: {dog.life_ageMax} years</p> 
                        {
                        dog.fan ? <button onClick= {handleDelete} className='bt'>Remove dog</button> : null
                        }
                    </div>
                :
                    <div>
                        <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0182.gif" alt="Error 404"/>
                    </div>
            }
        </div>
    )
}