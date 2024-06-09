import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeart, IoIosTrash } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import BackgroundImage from "../components/BackgroundImage";
import Comments from "../components/Comments";
import axios from "../axios";
import { selectUserRole, selectUserId } from "../redux/slices/auth";
import { addComment } from "../redux/slices/comment";
import { fetchFavoritesCount } from '../redux/slices/favorite';

const PicturePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const role = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  const [data, setData] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const favoritesCount = useSelector((state) => state.favorite.favorites[id]) || 0;

  const onGroupClick = useCallback(() => {
    navigate("/gallerypage");
  }, [navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/gallery/${id}`);
      alert("Картина успішно видалена");
      navigate("/gallerypage");
    } catch (err) {
      console.warn("Помилка при видаленні картини:", err);
      alert(err.response?.data?.message || "Помилка при видаленні картини");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addComment({ pictureId: id, userId, content: comment }));
      setComment('');
      await fetchComments();
    } catch (err) {
      console.warn("Помилка при додаванні коментаря:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/gallery/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.warn("Помилка при отриманні коментарів:", err);
      alert(err.response?.data?.message || "Помилка при отриманні коментарів");
    }
  };

  useEffect(() => {
    axios
      .get(`/gallery/${id}`)
      .then((res) => {
        setData(res.data);
        fetchComments();
      })
      .catch((err) => {
        console.warn(err);
        alert(err.response?.data?.message || "Помилка при отриманні статті");
      });
  }, [id]);

  useEffect(() => {
    dispatch(fetchFavoritesCount(id))
      .catch((err) => console.error("Помилка при отриманні кількості вподобань", err));
  }, [dispatch, id]);

  return (
    <>
      <BackgroundImage src="pictures.png"/>
      <button
        className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10"
        onClick={onGroupClick}
      >
        <IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
      </button>
      <section className="self-stretch flex flex-row items-start justify-center pt-20 box-border w-3/4 text-left text-xl mx-auto">
        <div className="w-full max-w-[800px] rounded-xl bg-darkgray-200 text-white flex justify-start flex-wrap pt-[35px] px-[33px] pb-[35px] mb-10 overflow-hidden">
          <div className="flex justify-between z-10 overflow-hidden">
            <div className="w-2/4">
              <img className="w-full h-auto" src={`http://localhost:5000${data?.picture}`} alt="Painting" />
              <div className="mt-2 h-auto overflow-hidden">
                <div className="flex items-center max-w-[400px]">
                  <button className="mt-1 bg-transparent">
                    <IoIosHeart className="w-5 h-5 text-white" />
                  </button>
                  <span>{favoritesCount}</span>
                </div>
                <h2 className="text-xl mt-[2.5rem]">{data?.user?.name}</h2>
                <p className="mt-2 text-lgi text-gray-300">{data?.tag}</p>
                <h2 className="text-xl mt-[2.5rem]">{data?.title}</h2>
                <p className="mt-2 text-lgi">{data?.text}</p>
              </div>
            </div>
            <div className="w-2/4 mt-0 pl-6">
              <form className="flex gap-2" onSubmit={handleAddComment}>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Написати коментар..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-5"
                />
                <button
                  type="submit"
                  className="w-10px rounded-md text-white bg-orange-500 py-2 px-4 pt-3 mb-5 hover:bg-orange-700"
                >
                  <AiOutlineSend />
                </button>
              </form>
              {comments.map((comment) => (
                <Comments key={comment._id} comment={comment}  role={role}/>
              ))}
            </div>
          </div>
          {role === "artist" && data.user && data.user._id === userId && (
            <button
              type="submit"
              onClick={handleDelete}
              className="w-full rounded-md text-white bg-gray-500 p-2 mt-10 hover:bg-rose-700"
            >
              <IoIosTrash className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default PicturePage;
