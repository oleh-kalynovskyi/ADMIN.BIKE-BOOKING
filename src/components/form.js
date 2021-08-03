import React, { Component } from 'react'
import './form.css';
import localforage from 'localforage';

import { MdClose } from 'react-icons/md';

import List from './list' 
import Stistic from './stistic' 


export default class Form extends Component {

    state = {
        bike: {
            names: '',
            type:'',
            color:'',
            size:'',
            price: '',
            slug:'',
            description:'',
            id:'',
            status: 'available'
        },
        bikes: [],
        modal: false
    }

    componentDidMount = () => {
        localforage.getItem('bikeList').then( (value) => {
            if(value) {
                this.setState({
                    bikes: value
                });
            }
        })
    };  

    handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();

        const curItem = this.state.bike;
        const arr = this.state.bikes;
        const index = arr.findIndex(el => el.slug === curItem.slug); 
        index === -1 
        ?
        await this.setState({
            bikes: [...this.state.bikes, this.state.bike]
        })
        :
        this.setState({
            modal: true
        })
        // setTimeout(() => 
        //     this.setState({
        //         modal: false
        //     })
        // , 1000);

        localforage.setItem('bikeList', this.state.bikes )
    }

    handleChange = (e) => {
        const input = e.target;
        const form = input.form;
        const value = input.value;
    
        this.setState({
          [form.name]: {
            ...this.state[form.name],
            [input.name]: value,
            id: Math.random() // individual id for each bike 
          }
        });
    }

    remove = async (id) => {
        await this.setState({
            bikes: this.state.bikes.filter(el => el.id !== id)
        });
        localforage.setItem('bikeList', this.state.bikes );
    }

    saveChange = async (id, status) => {
        const newStatus = this.state.bikes.map( item => {
            if(item.id === id) {
                item.status = status
            }
            return item
        })
        await this.setState({
            bikes: newStatus
        });
        localforage.setItem('bikeList', this.state.bikes );
    }

    close = () => {
        this.setState({
            modal: !true
        })
    }

    render() {
        return (
            <div className="main">
                { this.state.modal 
                    ? 
                    <div className="modal">
                        <MdClose className="bnt"
                                onClick={ this.close }/>
                        <h1>
                            An object with this ID exists - enter unique ID
                        </h1>
                    </div> 
                    : null }

                {this.state.bikes.length ? 
                    <List 
                        Bike={  this.state.bikes }
                        Remove={  this.remove }
                        SaveChange={ this.saveChange }
                    />
                    :
                    <div className="isFetching">
                    </div>
                }

            <div className="panel">
                <form 
                    onSubmit={this.handleSubmit} 
                    className="form"
                    name="bike" >

                    <input 
                        minLength="5"
                        required
                        type="text" 
                        name="names" 
                        placeholder="Name"
                        onChange={this.handleChange}
                        />

                    <input 
                        minLength="5"
                        required
                        type="text" 
                        name="type" 
                        placeholder="Type"
                        onChange={this.handleChange}
                        />

                    <input 
                        minLength="5"
                        required
                        type="text" 
                        name="color" 
                        placeholder="Color"
                        onChange={this.handleChange}
                        />
                    
                    <input 
                        minLength="5"
                        required
                        type="text" 
                        name="size" 
                        placeholder="Wheel size"
                        onChange={this.handleChange}
                        />

                    <input 
                        minLength="3"
                        required
                        type="text"
                        pattern="^[ 0-9]+$" 
                        name="price" 
                        placeholder="Price"
                        onChange={this.handleChange}
                        />
                    
                    <input 
                        minLength="5"
                        required
                        type="text" 
                        pattern="^[ 0-9]+$"
                        name="slug" 
                        placeholder="ID (slug) XXXXXXXXXXX"
                        onChange={this.handleChange}
                        />
                    
                    <textarea 
                        minLength="5"
                        required
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                        >
                    </textarea>

                    <div className="form-btn-box">
                        <button className="form-btn" type="submit"> SAVE </button>
                        <button className="form-btn" type="reset"> CLEAR </button>
                    </div>

                </form>

                <Stistic 
                    Bike={  this.state.bikes }
                />
            </div>
        </div>
        )
    }
}
