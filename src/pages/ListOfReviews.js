import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { APIConfig } from 'src/store/Api-Config';
import { TokenService } from "src/storage.service";

function ListOfReviews(){
    const API = useContext(APIConfig);
    const productAPI = API.productAPI;
    const param=useParams();
    const rAPI =productAPI +param.id+"/"+ API.reviewAPI;
    console.log(API.reviewAPI);
    console.log(rAPI);

    const [reviews, setReviews] = useState();
    //reviewAPI

    function GetReviews(){
        axios(rAPI)
        .then(res => {
            console.log(res.data)
            setReviews(res.data)
        })
        .catch(err => console.log(err.message));

        
    }

    useEffect(GetReviews, []);
    return(
        <h1>{reviews}</h1>
    );
}

export default ListOfReviews;