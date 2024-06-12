import React from "react";
import "./App.css";
// import MapDist from "./MapDist";
import MapComp from "./MapComp";
import SinglevalueSlider from "./SinglevalueSlider";
import SingleValueList from "./SingleValueList";
import SingleValueDropDown from "./SingleValueDropDown";
import MultiValueDropDown from "./MultiValueDropDown";
import DropdownButton from "./DroptdownButton";
// import MapComponent from "./MapComponent";

// 
const App = () => {


  return (
    <div className="App">
      <MapComp  />
      {/* <MapComponent/> */}
   {/* <MapDist/> */}
   <SinglevalueSlider/>
   <SingleValueList/>
   <SingleValueDropDown/>
   <MultiValueDropDown/>
   <DropdownButton/>


    </div>
  );
};

export default App;
