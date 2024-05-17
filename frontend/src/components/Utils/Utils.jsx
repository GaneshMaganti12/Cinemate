export const abbrevationGenres = (array) => {
  const genres = array.reduce((arr, item) => {
    return [...arr, ...item.genre];
  }, []);

  const genreArray = genres
    .filter((item, index) => genres.indexOf(item) === index)
    .map((item) => {
      return {
        genre: item,
        isActive: false,
      };
    })
    .sort((a, b) => a.genre.localeCompare(b.genre));

  const all = {
    genre: "All",
    isActive: true,
  };

  return [all, ...genreArray];
};

export const transformMoviesData = (data) => {
  return data.map((item) => {
    return {
      id: item._id,
      title: item.title,
      year: item.year,
      genre: item.genre.join(", "),
      thumbnailUrl: item.thumbnail_url,
      rating: item.rating,
    };
  });
};

export const transformMovieData = (data) => {
  const movieDetails = data.movie_details;
  const similarMoviesDetails = data.similar_movies;

  return {
    id: movieDetails.id,
    title: movieDetails.title,
    year: movieDetails.year,
    rating: movieDetails.rating,
    genre: movieDetails.genre.join(", "),
    runningTime: calculateRunningTime(movieDetails.running_time),
    plot: movieDetails.plot,
    fullPlot: movieDetails.full_plot,
    movieTrailerUrl: movieDetails.movie_trailer_url,
    certificate: movieDetails.certificate,
    movieCast: movieDetails.movie_cast.map((item) => {
      return {
        imageUrl: item.image_url,
        castName: item.cast_name,
        characterName: item.character_name,
        castBioUrl: item.cast_bio_url,
      };
    }),
    movieImageUrl: movieDetails.movie_image_url,
    moviePhotos: movieDetails.movie_photos,
    streamingUrls: movieDetails.streaming_urls.map((item) => {
      return {
        imageUrl: item.image_url,
        movieUrl: item.movie_url,
      };
    }),
    movieVideos: movieDetails.movie_videos.map((item) => {
      return {
        videoUrl: `https://www.youtube.com/watch?v=${item}`,
        videoThumbnailUrl: convertVideoUrlToImageUrl(item),
      };
    }),
    directedBy: movieDetails.directed_by.map((item) => {
      return {
        name: item.name,
        bioUrl: item.bio_url,
      };
    }),
    producedBy: movieDetails.produced_by.map((item) => {
      return {
        name: item.name,
        bioUrl: item.bio_url,
      };
    }),
    productionCompanies: movieDetails.production_companies.map((item) => {
      return {
        name: item.name,
        infoUrl: item.info_url,
      };
    }),
    budget: calculateMillionOrBillion(movieDetails.budget),
    boxOffice: calculateMillionOrBillion(movieDetails.box_office),
    similarMovies: similarMoviesDetails.map((item) => {
      return {
        id: item.id,
        title: item.title,
        year: item.year,
        genre: item.genre.join(", "),
        rating: item.rating,
        imageUrl: item.movie_image_url,
      };
    }),
  };
};

export const calculateRunningTime = (time) => {
  const hr = Math.floor(time / 60);
  const min = Math.ceil(time - hr * 60);

  if (min === 0) {
    return `${hr}h`;
  }

  return `${hr}h ${min}m`;
};

export const calculateMillionOrBillion = (data) => {
  const million = 1000000;
  const billion = 1000000000;

  const intoString = data.toString().length;

  if (intoString <= 9) {
    return `${data / million} million`;
  } else {
    return `${data / billion} billion`;
  }
};

export const convertVideoUrlToImageUrl = (videoId) => {
  const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return imageUrl;
};

export const transformWatchlistData = (data) => {
  const watchlistArray = data.reduce((arr, item) => {
    const arrays = item.watchlist.reduce((arr, item) => {
      arr.push(item);
      return arr;
    }, []);

    return [
      ...arr,
      ...arrays.map((item) => {
        return {
          id: item.id,
          movieId: item.movie_id,
          title: item.title,
          year: item.year,
          genre: item.genre.join(", "),
          rating: item.rating,
          imageUrl: item.image_url,
          date: item.createdAt,
        };
      }),
    ];
  }, []);

  return watchlistArray;
};

export const compareMovieItemWithWatchlistArray = (object, array) => {
  // return array.some((item) => item.movieId === object.id);
  return array.reduce((obj, item) => {
    if (item.movieId === object.id) {
      obj = item;
    }
    return obj;
  }, {});
};

export const abbrevationFullName = (name) => {
  const userName = name.split("@")[0].split(".").join(" ");
  let fullName = userName[0].toUpperCase();

  for (let i = 0; i < userName.length - 1; i++) {
    if (userName[i] === " ") {
      fullName += userName[i + 1].toUpperCase();
    } else {
      fullName += userName[i + 1];
    }
  }

  return fullName;
};

export const avatarColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export const transformCommentsData = (data) => {
  return data.map((item) => {
    return {
      id: item._id,
      name: item.name,
      movieId: item.movie_id,
      comment: item.comment,
      createdAt: item.createdAt,
    };
  });
};

export const abbrevationTime = (time) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDate = new Date().getDate();
  const currentHr = new Date().getHours();
  const currentMin = new Date().getMinutes();
  const currentSec = new Date().getSeconds();

  const createdAtYear = new Date(time).getFullYear();
  const createdAtMonth = new Date(time).getMonth() + 1;
  const createdAtDate = new Date(time).getDate();
  const createdAtHr = new Date(time).getHours();
  const createdAtMin = new Date(time).getMinutes();
  const createdAtSec = new Date(time).getSeconds();

  let date;

  if (currentYear - createdAtYear > 1) {
    date = `${currentYear - currentYear} years ago`;
  } else if (currentYear - currentYear === 1) {
    date = `${currentYear - currentYear} year ago`;
  } else {
    if (currentMonth - createdAtMonth > 1) {
      date = `${currentMonth - createdAtMonth} months ago`;
    } else if (currentMonth - createdAtMonth === 1) {
      date = `${currentMonth - createdAtMonth} month ago`;
    } else {
      if (currentDate - createdAtDate > 1) {
        date = `${currentDate - createdAtDate} days ago`;
      } else if (currentDate - createdAtDate === 1) {
        date = `${currentDate - createdAtDate} day ago`;
      } else {
        if (currentHr - createdAtHr > 1) {
          date = `${currentHr - createdAtHr} hours ago`;
        } else if (currentHr - createdAtHr === 1) {
          date = `${currentHr - createdAtHr} hour ago`;
        } else {
          if (currentMin - createdAtMin > 1) {
            date = `${currentMin - createdAtMin} minutes ago`;
          } else if (currentMin - createdAtMin === 1) {
            date = `${currentMin - createdAtMin} minute ago`;
          } else {
            if (currentSec - createdAtSec > 1) {
              date = `${currentSec - createdAtSec} seconds ago`;
            } else {
              date = `1 second ago`;
            }
          }
        }
      }
    }
  }

  return date;
};
