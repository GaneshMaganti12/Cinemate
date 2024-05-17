import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import "./MovieDetail.css";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  dispatchDeleteWatchlist,
  dispatchGetComments,
  dispatchGetWatchlist,
  dispatchMovieDetails,
  dispatchPostComments,
  dispatchPostWatchlist,
} from "../../Store/Actions/MoviesActions";
import StarRateIcon from "@mui/icons-material/StarRate";
import StreamingVideo from "../StreamingVideo/StreamingVideo";
import Sliders from "../Sliders/Sliders";
import MovieCast from "../MovieCast/MovieCast";
import { jwtDecode } from "jwt-decode";
import MovieDetailTable from "../MovieDetailTable/MovieDetailTable";
import Loader from "../../Loader/Loader";
import Popup from "../Popup/Popup";
import { dispatchLogout } from "../../Store/Actions/AuthActions";
import {
  abbrevationFullName,
  compareMovieItemWithWatchlistArray,
} from "../../Utils/Utils";
import Comments from "../Comments/Comments";
import SimilarMovies from "../SimilarMovies/SimilarMovies";
import LazyLoading from "../../LazyLoading/LazyLoading";

function MovieDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const {
    isMovieLoading,
    movieDetailsObject,
    isSuccess,
    watchlistData,
    commentsData,
  } = useSelector((state) => state.movies);
  const token =
    useSelector((state) => state.auth.loginData.token) ||
    localStorage.getItem("jwtToken");
  const decodeToken = jwtDecode(token);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [watchlistItem, setWatchlistItem] = useState({});
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [isGetWatchlist, setISGetWatchlist] = useState(false);

  const currentToken = Date.now() / 1000;

  const getMovieDetails = async () => {
    dispatch(dispatchMovieDetails(params.id, token));
  };

  const getWatchlistData = () => {
    dispatch(dispatchGetWatchlist(token));
  };

  const getCommentsData = () => {
    dispatch(dispatchGetComments(params.id, token));
  };

  useEffect(() => {
    document.title =
      window.location.pathname === `/movie/${params.id}`
        ? "Cinemate | Movie"
        : "Cinemate";

    window.scrollTo(0, 0);

    getMovieDetails();
    getWatchlistData();
    getCommentsData();
  }, [params.id]);

  useEffect(() => {
    setWatchlistItem(
      compareMovieItemWithWatchlistArray(movieDetailsObject, watchlistData)
    );
  }, [watchlistData, isWatchlist, movieDetailsObject]);

  useEffect(() => {
    setCommentsArray(commentsData);
  }, [commentsData]);

  useEffect(() => {
    setIsComment(false);
    getCommentsData();
  }, [isComment]);

  useEffect(() => {
    setISGetWatchlist(false);
    getWatchlistData();
  }, [isGetWatchlist]);

  useEffect(() => {
    if (Object.keys(watchlistItem).length) {
      setIsWatchlist(true);
    } else {
      setIsWatchlist(false);
    }
  }, [watchlistItem]);

  const handleClose = () => setOpen(false);

  const handleWatchlist = () => {
    const [month, date, year] = new Date().toLocaleDateString().split("/");

    const watchlistObject = {
      user_id: decodeToken.id,
      movie_id: params.id,
      title: movieDetailsObject.title,
      year: movieDetailsObject.year,
      genre: movieDetailsObject.genre,
      rating: movieDetailsObject.rating,
      image_url: movieDetailsObject.movieImageUrl,
      date: new Date(year, month - 1, date),
    };

    if (Object.keys(watchlistItem).length) {
      dispatch(dispatchDeleteWatchlist(watchlistItem.id, token));
    } else {
      dispatch(dispatchPostWatchlist(watchlistObject, token));
    }
    setISGetWatchlist(true);
  };

  const handleOnClickComment = async () => {
    if (comment.trim(" ")) {
      const userName = abbrevationFullName(decodeToken.letter);

      const commentObject = {
        name: userName,
        movie_id: params.id,
        comment: comment,
      };
      dispatch(dispatchPostComments(commentObject, token));
    }
    setIsComment(true);
    setComment("");
  };

  const handleCommentInput = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    const expireToken = decodeToken.exp;

    if (currentToken > expireToken) {
      navigate("/login");
      dispatch(dispatchLogout());
    }
  }, [decodeToken.exp, navigate]);

  return (
    <>
      <Header />
      <div className="movie-detail-container">
        {isMovieLoading && <Loader />}
        {!isMovieLoading && Object.keys(movieDetailsObject).length !== 0 && (
          <div className="movie-detail-card">
            <div className="movie-detail-poster-content-trailer-card">
              <div className="movie-detail-poster-content-plot-card">
                <div className="movie-detail-poster-content-container">
                  <div className="movie-detail-poster-card">
                    <LazyLoading
                      src={movieDetailsObject.movieImageUrl}
                      alt={movieDetailsObject.title}
                      className="movie-detail-poster"
                    />
                  </div>
                  <div className="movie-detail-content-card">
                    <h1 className="movie-detail-title">
                      {movieDetailsObject.title}{" "}
                      {`(${movieDetailsObject.year})`}
                    </h1>
                    <p className="movie-detail-content">
                      Genre - {movieDetailsObject.genre}
                    </p>
                    <p className="movie-detail-content">
                      Runtime - {movieDetailsObject.runningTime}
                    </p>
                    <p className="movie-detail-content">
                      CBFC - {movieDetailsObject.certificate}
                    </p>
                    <p className="movie-detail-content">
                      IMDb Rating - {movieDetailsObject.rating}
                      <StarRateIcon className="star-icon" />
                    </p>
                    <div className="watchlist-button-container-1">
                      <button
                        className={
                          isWatchlist
                            ? "watchlist-button watchlisted"
                            : "watchlist-button watchlist"
                        }
                        onClick={handleWatchlist}
                      >
                        {isWatchlist ? "Watchlisted" : "Add to Watchlist"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="movie-detail-plot-card">
                  <h1 className="movie-detail-plot-title">Plot</h1>
                  <p className="movie-detail-plot-para">
                    {movieDetailsObject.plot}
                    <span
                      className="movie-detail-more-info"
                      onClick={() => {
                        setOpen(true);
                        setTitle("plot");
                        setSelected(movieDetailsObject.fullPlot);
                      }}
                    >
                      more info
                    </span>
                  </p>
                </div>
              </div>
              <div className="watchlist-button-container">
                <button
                  className={
                    isWatchlist
                      ? "watchlist-button watchlisted"
                      : "watchlist-button watchlist"
                  }
                  onClick={handleWatchlist}
                >
                  {isWatchlist ? "Watchlisted" : "Add to Watchlist"}
                </button>
              </div>
              <div className="movie-detail-video-player-card">
                <ReactPlayer
                  url={movieDetailsObject.movieTrailerUrl}
                  className="video-player"
                />
              </div>
              <div className="movie-detail-plot-card-1">
                <h1 className="movie-detail-plot-title">Plot</h1>
                <p className="movie-detail-plot-para">
                  {movieDetailsObject.plot}
                  <span
                    className="movie-detail-more-info"
                    onClick={() => {
                      setOpen(true);
                      setTitle("plot");
                      setSelected(movieDetailsObject.fullPlot);
                    }}
                  >
                    more info
                  </span>
                </p>
              </div>
            </div>
            {movieDetailsObject.streamingUrls?.length !== 0 && (
              <div className="movie-detail-content-container-card">
                <h1 className="movie-detail-side-title">Streaming On</h1>
                {movieDetailsObject?.streamingUrls && (
                  <StreamingVideo data={movieDetailsObject.streamingUrls} />
                )}
              </div>
            )}
            {movieDetailsObject.moviePhotos && (
              <div className="movie-detail-content-container-card">
                <h1 className="movie-detail-side-title">
                  Photos{" "}
                  {movieDetailsObject.moviePhotos && (
                    <span className="length-count">
                      {movieDetailsObject.moviePhotos.length}
                    </span>
                  )}
                </h1>
                <Sliders>
                  {movieDetailsObject?.moviePhotos &&
                    movieDetailsObject.moviePhotos.map((item, index) => (
                      <div
                        key={index}
                        className="movie-detail-photo-item"
                        onClick={() => {
                          setOpen(true);
                          setTitle("photo");
                          setSelected(item);
                        }}
                      >
                        <LazyLoading
                          src={item}
                          className="movie-detail-photo"
                        />
                      </div>
                    ))}
                </Sliders>
              </div>
            )}
            {movieDetailsObject.movieVideos.length !== 0 && (
              <div className="movie-detail-content-container-card">
                <h1 className="movie-detail-side-title">
                  Videos{" "}
                  {movieDetailsObject.movieVideos && (
                    <span className="length-count">
                      {movieDetailsObject.movieVideos.length}
                    </span>
                  )}
                </h1>
                <Sliders>
                  {movieDetailsObject?.movieVideos &&
                    movieDetailsObject.movieVideos.map((item, index) => (
                      <div
                        key={index}
                        className="movie-detail-video-item"
                        onClick={() => {
                          setOpen(true);
                          setTitle("video");
                          setSelected(item.videoUrl);
                        }}
                      >
                        <LazyLoading
                          src={item.videoThumbnailUrl}
                          className="movie-detail-video"
                        />
                      </div>
                    ))}
                </Sliders>
              </div>
            )}
            {movieDetailsObject.movieCast.length !== 0 && (
              <div className="movie-detail-content-container-card">
                <h1 className="movie-detail-side-title">Top Cast</h1>
                {movieDetailsObject.movieCast.length && (
                  <MovieCast data={movieDetailsObject.movieCast} />
                )}
              </div>
            )}
            <div className="movie-detail-more-card">
              <MovieDetailTable data={movieDetailsObject} />
            </div>
            <div className="movie-detail-comments-card">
              <h1 className="movie-detail-side-title">
                Comments {commentsArray.length}
              </h1>
              <div className="comment-textarea-card">
                <textarea
                  rows={3}
                  maxLength={500}
                  className="comment-input"
                  placeholder="write your comment here..."
                  onChange={handleCommentInput}
                  value={comment}
                />
                {comment && (
                  <div className="comment-buttons-card">
                    <button
                      className="comment-button"
                      onClick={() => setComment("")}
                    >
                      Cancel
                    </button>
                    <button
                      className="comment-button"
                      onClick={handleOnClickComment}
                    >
                      Comment
                    </button>
                  </div>
                )}
              </div>
              {commentsArray.length ? (
                <ul className="movie-detail-comment-container">
                  {commentsArray.map((item) => (
                    <Comments key={item.id} data={item} />
                  ))}
                </ul>
              ) : (
                <div className="no-comments-card">
                  <h1 className="no-comments">No Comments Yet</h1>
                </div>
              )}
            </div>
            <div className="similar-movies-card">
              <h1 className="movie-detail-side-title">Similar Movies</h1>
              {movieDetailsObject.similarMovies.length && (
                <SimilarMovies data={movieDetailsObject.similarMovies} />
              )}
            </div>
          </div>
        )}
        {!isMovieLoading && !isSuccess && (
          <div className="error-container">
            <img
              className="error-image"
              src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1712242843/No_data-amico_dfvlef.png"
              alt="error"
            />
            <h1 className="error-title">Oops! Something Went Wrong</h1>
            <p className="error-para">
              We cannot seem to find the page you are looking for.
            </p>
            <button className="retry-button" onClick={() => getMovieDetails()}>
              Retry
            </button>
          </div>
        )}
        <Popup
          handleClose={handleClose}
          open={open}
          title={title}
          selected={selected}
        />
      </div>
    </>
  );
}

export default MovieDetail;
