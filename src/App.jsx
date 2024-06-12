import React from "react";
import "./App.css";
// import MapDist from "./MapDist";
import MapComp from "./MapComp";
import SinglevalueSlider from "./SinglevalueSlider";
import SingleValueList from "./SingleValueList";
import SingleValueDropDown from "./SingleValueDropDown";
import MultiValueDropDown from "./MultiValueDropDown";
import DropdownButton from "./DroptdownButton";
import Range from "./Range";
import OrderData from './OrderData'
// import MapComponent from "./MapComponent";

// 
const App = () => {


  return (
    <div className="App">
     
     
      {/* <MapComponent/> */}
   {/* <MapDist/> */}
   <SinglevalueSlider/>
   <SingleValueList/>
   <OrderData/>
   <SingleValueDropDown/>
   <MultiValueDropDown/>
   <DropdownButton/>
   <Range/>
   <MapComp  />
   
 


    </div>
  );
};

export default App;
