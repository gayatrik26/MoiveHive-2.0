import axios from 'axios';
import './Trending.css';
import React, { useEffect, useState } from 'react';
import SingleMovie from '../../components/SingleMovie/SingleMovie';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Trending = () => {
    const [content , setContent] = useState([]);
    const [page , setPage] = useState(1);
    

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data);
        setContent(data.results);
    }

    useEffect(()=>{
        fetchTrending();// eslint-disable-next-line
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
                {
                    content && content.map((c) => (
                        <SingleMovie 
                            key={c.id} 
                            id={c.id} 
                            title={c.title || c.name} 
                            poster={c.poster_path} 
                            date={c.first_air_date || c.release_data}
                            media_type={c.media_type}
                            vote_average={c.vote_average} 
                        />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending