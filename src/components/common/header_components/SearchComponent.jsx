import React,{useState} from 'react'
import { Button, Input } from 'reactstrap';
import { useContext } from "react";
import { AuthContext } from "../../../hooks/AuthContextProvider";

function SearchComponent({data}) {
    const [searchValue, setSearchValue] = useState('');
    const { searchText, setSearchText } = useContext(AuthContext);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
      };
    
      const handleSearch = () => {
        // setSearchText(searchValue)
      };

    return (
    <>
    <div className='d-flex'>
      <Input
        style={{width: '20rem'}}
        type="text"
        placeholder={data?data:"Search..."}
        value={searchText}
        onChange={handleInputChange}
      />
      <Button className='ms-2' color="primary" onClick={handleSearch}>Search</Button>
    </div>
    </>
  )
}

export default SearchComponent