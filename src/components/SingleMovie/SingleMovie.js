import React from 'react';
import { img_300, unavailable } from '../../config/config.js';
import './SingleMovie.css';
import { Badge } from '@mui/material';
import ContentModal from '../ContentModal/ContentModal.js';

const SingleMovie = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
}) => {

    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge
                badgeContent={vote_average}
                color={vote_average > 6 ? "success" : "secondary"}
                overlap="circular"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            ></Badge>
            <img
                className="poster"
                src={poster ? `${img_300}${poster}` : unavailable}
                alt={title}
            />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date || 'No date available'}</span>
            </span>
        </ContentModal>
    )
}

export default SingleMovie;