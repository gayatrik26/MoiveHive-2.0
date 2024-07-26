import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleMovie from '../../components/SingleMovie/SingleMovie';
import CustomPagination from '../../components/Pagination/CustomPagination';
import Genres from '../../components/Genres';
import useGenre from '../../hooks/useGenre';

const Moives = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);//custom hook to provide with string of slected ids


  const fectchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log(data);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fectchMovies();// eslint-disable-next-line
  }, [page,genreforURL]);

  return (
    <div>
      <span className='pageTitle'>Moives</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className='trending'>
        {
          content && content.map((c) => (
            <SingleMovie
              key={c.id}
              id={c.id}
              title={c.title || c.name}
              poster={c.poster_path}
              date={c.first_air_date || c.release_data}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))
        }
      </div>
      {numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages>500 ? 500 : numOfPages} />)}
    </div>
  )
}

export default Moives;