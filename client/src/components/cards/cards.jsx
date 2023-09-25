import React from 'react';
import './cards.css';

export default function Card({name, image, Tempers, weightMax, weightMin}){
    return (
        <div className='cards'>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <p className='temp'>Temperaments: {Tempers.map(d => d + (" | "))}</p>
            <p className='weight'>Min: {weightMin}Kg - Max: {weightMax}Kg</p>
        </div>
    )
}