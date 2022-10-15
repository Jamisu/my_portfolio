import React from "react"
import CommentsList from "./CommentsList/CommentsList"
import PaginationModule from './PaginationModule/PaginationModule'

import { useEffect, useState } from 'react';

const Comments = () => {
    const url = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api/comments'
    const [data, setData] = useState([]);
    let itemLimit = 6;
    console.log('init comments');
    /* 
        show preloader
        load data 
        hide preloader
        show CommentsList + PaginationModule + Comment button
    */

    useEffect(() => {
        console.log('async fetch');
        const fetchData = async () => {
            const response = await fetch(url);
            const newData = await response.json();
            console.log('newData', newData);
            setData(newData);
        };
        fetchData();
    }, [url]);

    return <>
        <CommentsList className="comments_list" comments={data}/>
        <PaginationModule className="paginatiun_module"/>
    </>
}

export default Comments