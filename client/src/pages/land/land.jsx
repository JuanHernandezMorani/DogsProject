import React from 'react';
import { Link } from 'react-router-dom';
import './land.css'

export default function LandingPage(){
    return (
        <div className='conteiner'>
            <h1 className='h1'>Welcome to my dogs project</h1>
            <p className='p'>
          Here you can see all types of dogs, <br />
          their age span, weight, <br />
          height, and photo.<br />
          <br />
          <span className='span'>¡Also, you can create your own dog!</span>
          <br/>
          <span className='span'>Have fun</span>
        </p>
            <Link to='/home'>
                <button className='bt'>Lets begin</button>
            </Link>
        </div>
    )
}