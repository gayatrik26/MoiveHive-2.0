import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import axios from "axios";
import {img_500, unavailable, unavailableLandscape} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";


// Create a custom Backdrop component
const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0)', // Lighter color with transparency
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPaper = styled('div')(({ theme }) => ({
  width: '90%',
  height: '80%',
  backgroundColor: '#222831',
  border: '1px solid #282c34',
  borderRadius: 10,
  color: 'white',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(1, 1, 3),
}));

export default function TransitionsModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();// eslint-disable-next-line
  }, [media_type, id]);

  return (
    <>
      <div
        className="media"
        style={{ cursor: 'pointer' }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{
          backdrop: CustomBackdrop,  // Use the custom Backdrop component
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (
            <StyledPaper>
              <div className="ContentModal">
                <img
                  src={content.poster_path ? `${img_500}/${content.poster_path}`: unavailable}
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={content.backdrop_path? `${img_500}/${content.backdrop_path}`: unavailableLandscape}
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(content.first_air_date || content.release_date || '-----').substring(0, 4)}
                    )
                  </span>

                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </StyledPaper>
          )}
        </Fade>
      </StyledModal>
    </>
  );
}