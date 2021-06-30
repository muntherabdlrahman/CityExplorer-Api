// import React, { Component } from 'react'
// import axios from 'axios';

// export class Theweather extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             cityNameI: '',
//             location: '',
//             latitude: '',
//             longitude: '',
//             description: '',
//             date: '',
//             error: '',
//             show: false
//         }
//     }

//     citytypeName = (e) => {
//         this.setState({
//             cityNameI: e.target.value
//         })
//     }


//     tosubmitTheForm = async (e) => {
//         try {


//             e.preventDefault();
//             let axiosResData = await axios.get(`http://localhost:8000/weather/${this.state.cityNameI}`);
//             this.setState({
//                 show: true,
//                 location: axiosResData.data.city_name,
//                 latitude: axiosResData.data.lat,
//                 longitude: axiosResData.data.lon,
//                 description: axiosResData.data[0].description,
//                 date: axiosResData.data[0].datetime,
//                 error: ""

//             })
//         }
//         catch {
//             this.setState({
//                 show: false,
//                 error: "Type the name of the city with first latter as capital"

//             })
//         }

//     }



//     render() {
//         return (
//             <div>
                
//               <h2>Location (Amman , Paris , Seattle..... )</h2>
//               <form onSubmit={this.tosubmitTheForm}>
//               <input type="text" placeholder="Amman..."  onChange={(e)=>{this.citytypeName(e)}}/>
//               <p>{this.state.error}</p>
//               <button type="submit" variant="info">Explore!</button>

//               </form>
              


              
//                     {
//                         this.state.show &&
//                         <>
//                         <p>City name is: {this.state.location}</p><br/><br/><br/>
//                         <p>Latitude is: {this.state.latitude}</p><br/><br/><br/>
//                         <p>Longitude is: {this.state.longitude}</p>
//                         </>
//                     }
//                         {
//                          this.state.show &&
//                          <>
//                          <p> About the city : {this.state.description}</p> <br/><br/><br/><br/>
//                          <p>Time is: {this.state.date}</p>
//                          </>
//                     }



//             </div>
//         )
//     }
// }

// export default Theweather
