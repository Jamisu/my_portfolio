import React from "react"
import CommentsList from "./CommentsList/CommentsList"
import PaginationModule from './PaginationModule/PaginationModule'

import './Comments.scss'

import { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import SortButton from "./SortButton/SortButton";

const Comments = () => {
    const [dayMode] = useOutletContext();
    const urlBase = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api/comments?sortBy=createdAt&order='
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('asc');
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
            const response = await fetch(urlBase + sort);
            const newData = await response.json();
            setData(newData.slice(page * itemLimit, (page + 1) * itemLimit));
        };
        fetchData();
    }, [itemLimit, page, sort]);

    return  <div className='comments'>
                <div className='comments_top_layer'>
                    <h2>Comments</h2>
                    <SortButton sort={sort} setSort={setSort}/>
                </div>
                
                <CommentsList comments={data}/>
                <PaginationModule />
            </div>
}

export default Comments