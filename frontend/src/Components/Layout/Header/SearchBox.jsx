import React, { useState } from 'react'
import './SearhBox.css'
import { useNavigate } from "react-router-dom";
import MetaData from "../../Layout/MetaData";
// import { useParams } from 'react-router-dom';
const SearchBox = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };
    return (
        <>
            <MetaData title="Search Products " />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default SearchBox