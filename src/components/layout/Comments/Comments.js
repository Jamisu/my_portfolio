import React from "react"
import CommentsList from "./CommentsList/CommentsList"
import PaginationModule from './PaginationModule/PaginationModule'

import './Comments.scss'

import { useEffect, useState } from 'react';

const Comments = () => {
    const url = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api/comments'
    const [data, setData] = useState([]);
    let itemLimit = 4;
    let page = 0;
    /* 
        show preloader
        load data 
        hide preloader
        show CommentsList + PaginationModule + Comment button
    */

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const newData = await response.json();
            setData(newData.slice(page * itemLimit, (page + 1) * itemLimit));
        };
        fetchData();
    }, [itemLimit, page]);

    return <div className='comments'>
        <div className='comments_top_layer'>
            <h2>Comments</h2>
            <div>oldest | newest</div>
        </div>
        
        <CommentsList comments={data}/>
        <PaginationModule />
    </div>
}

export default Comments