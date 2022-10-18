import React from "react"
import CommentsList from "./CommentsList/CommentsList"
import PaginationModule from './PaginationModule/PaginationModule'
import AddComment from "./AddComment/AddComment"

import './Comments.scss'

import { useEffect, useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import SortButton from "./SortButton/SortButton";

const Comments = () => {
    const [dayMode] = useOutletContext();
    const urlBase = 'https://62cbcfcd8042b16aa7c2d987.mockapi.io/blog/api/comments?sortBy=createdAt&order='
    const [data, setData] = useState([]);   // trimmed data
    const dataLength = useRef(0);
    const [sort, setSort] = useState('desc');
    const [page, setPage] = useState(1);
    const [addComment, setAddComment] = useState(false);
    let itemLimit = 4;

    useEffect(() => {        
        const fetchData = async () => {
            const response = await fetch(urlBase + sort);
            const newData = await response.json();
            dataLength.current = newData.length;
            setData(newData.slice((page - 1) * itemLimit, page * itemLimit));
        };
        calculateMaxItemLimit();
        fetchData();
    }, [itemLimit, page, sort]);

    // TODO - lift resize state to layout, pass in OutletContext for otimisation
    const calculateMaxItemLimit = () => {
        // vertical occupied space - (menu + pagination + footer).height
        const verticalSpace = 350;
        itemLimit = Math.floor((window.innerHeight - verticalSpace) / 120)
    }

    return  (
        !addComment ? (
            <div className='comments'>
                <div className='comments_top_layer'>
                    <h2>Comments</h2>
                    <SortButton sort={sort} setSort={setSort}/>
                </div>
                
                <CommentsList comments={data}/>
                <div className="comments_bottom_layer">
                    <PaginationModule page={page} setPage={setPage} pageSize={itemLimit} dataLength={dataLength.current}/>
                    <button className="comment_button" onClick={e=>setAddComment(true)}>Comment</button>
                </div> 
            </div>
            ) : (
            <div className='comments'>
                <AddComment closePanel={e=>{setPage(1); setAddComment(false)}}/>
            </div>
        ))        
}

export default Comments