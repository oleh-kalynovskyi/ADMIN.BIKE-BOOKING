import React from 'react';
import './stistic.css';


export default function Stistic(props) {

    const bikes = props.Bike
    const total = bikes.length

    function availableBikes() {
        const doneHabits = bikes.map(el => {
            return el.status;
        })
        const count = doneHabits.reduce( (tally, bike) => {
            tally[bike] = (tally[bike] || 0) + 1 ;
            return tally;
          }, {})
        return count
    }
    
    function commonCost() {
        const price = bikes.map(el => {
            return el.price;
        })
        const count = price.reduce((accumulator, currentValue) => {
            return parseInt(accumulator) + parseInt(currentValue)
        }, 0)
        return count
    }

    return (
        <div className="statistic">
            <h3 className="statistic-header">Stistics</h3>
            <div className="total-bikes"> 
                Total Bikes: <strong>{ total || 0 }</strong> 
            </div>
            <div className="available-bikes">
                Available Bikes: <strong>{ availableBikes().available || 0}</strong> 
            </div>
            <div className="booked-bikes">
                Booked Bikes: <strong>{ availableBikes().busy || 0 } </strong>
            </div>
            <div className="cost-bikes">
                Avarage bike cost: <strong>{  (commonCost() / total) ? (commonCost() / total).toFixed(2) : '0.00' } </strong>  UAH/hr.
            </div>
        </div>
    )
}
