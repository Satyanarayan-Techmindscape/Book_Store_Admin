import React, { useState } from "react";
import { Button } from "reactstrap";

const states = [ 
  { name: "All State"},
  { name: "Andhra Pradesh", cities: ["All Cities","Amaravati", "Vijayawada", "Guntur", "Nellore", "Visakhapatnam", "Kakinada", "Prajnaahmundry"] },
  { name: "Arunachal Pradesh", cities: ["All Cities","Itanagar", "Pasighat", "Roing", "Along", "Bomdila", "Ziro"] },
  { name: "Assam", cities: ["All Cities","Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"] },
  { name: "Bihar", cities: ["All Cities","Patna", "Bhagalpur", "Muzaffarpur", "Gaya", "Darbhanga", "Purnia"] },
  { name: "Chhattisgarh", cities: ["All Cities","Raipur", "Bhilai", "Durg", "Prajnanandgaon", "Bilaspur", "Korba"] },
  { name: "Goa", cities: ["All Cities","Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"] },
  { name: "Gujarat", cities: ["All Cities","Gandhinagar", "Ahmedabad", "Surat", "Vadodara", "Prajnakot", "Bhavnagar"] },
  { name: "Haryana", cities: ["All Cities","Chandigarh", "Faridabad", "Gurgaon", "Panipat", "Yamunanagar", "Rohtak"] },
  { name: "Himachal Pradesh", cities: ["All Cities","Shimla", "Dharamshala", "Mandi", "Kullu", "Solan", "Palampur"] },
  { name: "Jharkhand", cities: ["All Cities","Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh"] },
  { name: "Karnataka", cities: ["All Cities","Bengaluru", "Mysore", "Hubli-Dharwad", "Belagavi", "Gulbarga", "Mangaluru"] },
  { name: "Kerala", cities: ["All Cities","Thiruvananthapuram", "Kochi", "Thrissur", "Kozhikode", "Kollam", "Palakkad"] },
  { name: "Madhya Pradesh", cities: ["All Cities","Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar"] },
  { name: "Maharashtra", cities: ["All Cities","Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"] },
  { name: "Manipur", cities: ["All Cities","Imphal", "Lilong", "Thoubal", "Ukhrul", "Bishnupur", "Churachandpur"] },
  { name: "Meghalaya", cities: ["All Cities","Shillong", "Tura", "Nongstoin", "Williamnagar", "Resubelpara", "Baghmara"] },
  { name: "Mizoram", cities: ["All Cities","Aizawl", "Lunglei", "Saiha", "Kolasib", "Champhai", "Serchhip"] },
  { name: "Nagaland", cities: ["All Cities","Kohima", "Dimapur", "Wokha", "Mokokchung", "Tuensang", "Zunheboto"] },
  { name: "Odisha", cities: ["All Cities","Bhubaneswar", "Cuttack", "Berhampur", "Rourkela", "Sambalpur", "Puri"] },
  { name: "Punjab", cities: ["All Cities","Chandigarh", "Amritsar", "Jalandhar", "Ludhiana", "Patiala", "Bathinda"] },
  { name: "Prajnaasthan", cities: ["All Cities","Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"] },
  { name: "Sikkim", cities: ["All Cities","Gangtok", "Gyalshing", "Mangan", "Namchi", "Ravangla", "Yangthang"] },
  { name: "Tamil Nadu", cities: ["All Cities","Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Tiruppur"] },
  { name: "Telangana", cities: ["All Cities","Hyderabad", "Warangal", "Karimnagar", "Ramagundam", "Nizamabad", "Mahbubnagar"] },
  { name: "Tripura", cities: ["All Cities","Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Belonia", "Khowai"] },
  { name: "Uttar Pradesh", cities: ["All Cities","Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi"] },
  { name: "Uttarakhand", cities: ["All Cities","Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Kashipur"] },
  { name: "West Bengal", cities: ["All Cities","Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "English Bazar"] }
];


const StateCitySelector = ({ onChange, selection }) => {
  const [selectedState, setSelectedState] = useState(
    selection ? states.find(state => state.name === selection.state) : null
  );
  const [selectedCity, setSelectedCity] = useState(
    selection ? selection.city : null
  );

  const handleStateChange = event => {
    setSelectedState(states.find(state => state.name === event.target.value));
    setSelectedCity(null);
    onChange({ state: event.target.value, city: null });
  };

  const handleCityChange = event => {
    setSelectedCity(event.target.value);
    onChange({ state: selectedState.name, city: event.target.value });
  };

  const handleUnselect = () => {
    setSelectedState(null);
    setSelectedCity(null);
    onChange({ state: null, city: null });
  };

  return (
    <div>
         <div className="offset-xl-3 offset-sm-4 pt-3">
      <select value={selectedState ? selectedState.name : ""} onChange={handleStateChange}>
        <option value="">Select a state</option>
        {states.map(state => (
          <option key={state.name} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
   
      {(selectedState &&selectedState.name!="All State")&& (
        <select value={selectedCity || ""} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {selectedState.cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}

{/* <Button type="button"color="danger" style={{marginLeft:'20px'}} onClick={handleUnselect}>Unselect</Button > */}
    </div>
    </div>
  );
};

const MultipleStateCitySelector = () => {
  const [selections, setSelections] = useState([]);

  const handleSelection = (index, selection) => {
    setSelections(
      selections.map((sel, i) => (index === i ? selection : sel))
    );
  };

  return (
    <div>
      {selections.map((selection, index) => (
        <StateCitySelector
          key={index}
          onChange={sel => handleSelection(index, sel)}
          selection={selection}
        />
      ))}

     
          <div className="offset-xl-3 offset-sm-4 pt-3">
                        <Button type="button" color="primary" onClick={() => {
          setSelections([...selections, {}]);
        }}>
                        Add another selector
                        </Button>
                        </div>
     
</div>)
}
export default MultipleStateCitySelector;