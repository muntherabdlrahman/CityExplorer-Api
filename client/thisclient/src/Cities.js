import React, { Component } from 'react'
import axios from 'axios';

export class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            location: '',
            latitude: '',
            longitude: '',
            iemge: '',
            error: '',
            show: false,
            weather: [],
            movies: []


        }
    }





    onchangeForTyping = (e) =>///////1
    {
        this.setState({
            cityName: e.target.value
        })
    }

    toSubmitTheForm = async (e) => {/////2

        try {
            e.preventDefault();
            let axiosResp = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&city=${this.state.cityName}&format=json`)
            this.setState({
                show: true,
                cityName: axiosResp.data[0].display_name,
                location: axiosResp.data[0].display_name,
                latitude: axiosResp.data[0].lat,
                longitude: axiosResp.data[0].lon,
                error: ' '


            })
            let map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&center=${this.state.latitude},${this.state.longitude}&zoom=10`)
            this.setState({
                iemge: map.config.url
            })
        }
        catch {
            e.preventDefault();
            this.setState({

                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////weatherApp


        try {
            e.preventDefault();
            let weatherGet = await axios.get(`${process.env.REACT_APP_SERVER_API}/weather?lat=${this.state.latitude}&lon=${this.state.longitude}`)
            this.setState({
                weather: weatherGet.data,
                show: true
            })

        } catch {
            e.preventDefault();
            this.setState({

                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }
        console.log('before show',process.env.REACT_APP_SERVER_API)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MoviesApp
        try {
            e.preventDefault();
            let moviesGet = await axios.get(`${process.env.REACT_APP_SERVER_API}/movies?query=${this.state.cityName}`)
            this.setState({
                moveis: moviesGet.data,
                show: true


            })
        } catch {
            e.preventDefault();
            this.setState({

                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }




    }




    render() {
        return (
            <div style={{ backgroundColor: ('#FAEBE0') }}>
                <header>
                    <h1 style={{ fontFamily: ('cursive') }}>Explore about cities</h1>
                </header>
                <form onSubmit={this.toSubmitTheForm}>
                    <input type='text' placeholder='Type the city name....' onChange={(e) => { this.onchangeForTyping(e) }} />
                    <button type='submit'>Explore!</button>
                </form>
                <h4>
                    {this.state.error}
                </h4>





                {
                    this.state.show &&
                    <h2>Location is:{this.state.location} </h2>, <br />, <br />
                }
                <h2>Location is:{this.state.cityName} </h2><br /><br />
                <h2>Latitude is:{this.state.latitude}</h2><br /><br />
                <h2>Longitude is:{this.state.longitude}</h2><br /><br />
                <h2>The map below</h2>
                <img src={this.state.iemge}></img>

                {
                    this.state.show &&
                    console.log('after', this.state.weather.description),
                    this.state.weather.map((element, index) => {

                        return (
                            <h4>Description:{element.description}</h4>,
                            <h5>Date of:{element.date}</h5>
                        )
                    })
                }


                {
                    this.state.show &&
                    this.state.movies.map((ele,indx)=>{
                        return(
                        <h4>The title of movie:{ele.title}</h4>,
                        <h5>Have Votes:{ele.votes}</h5>,
                        <img src={ele.img}></img>
                        ) 


                    })
                }



            </div>
        )
    }
}

export default Cities
