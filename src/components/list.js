import React from 'react';
import classNames from 'classnames';
import { MdClose } from 'react-icons/md';

import './list.css';

export default function List(props) {

    const bikes = props.Bike;
    const {Remove, SaveChange} = props;
    
    return (
        <div className="bike-list">
            {bikes && bikes.map( (el, i) => {
                return(
                    <div  
                        key={i}
                        className={classNames("bikes-wrapper", {
                        "available": el.status === 'available',
                        "busy": el.status === 'busy',
                        "unavailable": el.status === 'unavailable'
                    })} >
                        <div className="bike-wrapper-left">
                            <div className="bikes-wrapper-name">
                                <strong>{el.names || 'NAME'}</strong> - {el.type || 'TYPE'} ({el.color || 'COLOR'}) 
                            </div>
                            <div className="bikes-wrapper-slug"> 
                                {el.slug || 'ID: ХХХХХХХХХХХХХ'} 
                            </div> 
                            <div className="bikes-wrapper-status"> STATUS: 
                                <select
                                    value={el.status}
                                    autoComplete="off"
                                    onChange={(e) => SaveChange( el.id, e.target.value )}
                                    >
                                        <option value="available">available</option>
                                        <option value="busy">busu</option>
                                        <option value="unavailable">unavailable</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="bike-wrapper-right">
                            <MdClose className="bike-wrapper bnt"
                                    onClick={ () => Remove(el.id) }/>
                            
                            <div className="bikes-wrapper-price">
                                { (parseInt(el.price)).toFixed(2)  || '00.00' } <span> UAH/hr</span>
                            </div>
                        </div>
                        
                    </div>
                )
            }) }
        </div>
    )
}