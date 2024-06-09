import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import BackgroundImage from "../components/BackgroundImage";
import PublishCard from "../components/PublishCard";
import { selectUserId, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";

export default function PublishPageArt() {
  const userId = useSelector(selectUserId);
  const isAuth = useSelector(selectIsAuth);
	const navigate = useNavigate();
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
	  if (!window.localStorage.getItem('token') && !isAuth) {
		navigate("/");
	  }
	});

	const onGroupClick = useCallback(() => {
		navigate(`/profileclientpage/${userId}`);
	}, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/allpictures/${userId}`);
        const paintingsWithCommentsAndFavs = await Promise.all(response.data.map(async (painting) => {
          const commentsResponse = await axios.get(`/${painting._id}/comments`);
          const favoritesResponse = await axios.get(`/${painting._id}/favorites`);
        return { ...painting, commentsCount: commentsResponse.data.commentsCount, favoritesCount: favoritesResponse.data.favoritesCount };
        }));
        setPaintings(paintingsWithCommentsAndFavs);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchData();
  }, [userId]);


  return (
    <div className="relative">
      <button className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10" onClick={onGroupClick}>
        <IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
      </button>
      <div className="grid place-items-center mt-20 mb-10">
        <BackgroundImage src="gallery.png"/>
        <div className="grid gap-5 max-w-[800px]">
          {paintings.map(painting => (
            <PublishCard 
              key={painting._id}
              pictureId = {painting._id}
              pictureName={painting.title} 
              artistName={painting.user.name}
              status={painting.status} 
              viewsCount={painting.viewsCount}
              favorite={painting.favoritesCount}
              comment={painting.commentsCount}
              paintiongUrl={painting.picture}
              role={"artist"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}