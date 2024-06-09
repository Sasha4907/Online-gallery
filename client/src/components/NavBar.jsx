import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectUserId, logout } from "../redux/slices/auth";

const NavBar = () => {
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);

  const onTextClick = useCallback((page) => {
    setActiveButton(page);
    navigate(page);
  }, [navigate]);

  const onProfileClick = useCallback(() => {
    setActiveButton("/profileclientpage");
    navigate(`/profileclientpage/${userId}`);
  }, [navigate, userId]);

  const handleLogout = () => {
    if(window.confirm('Ви впевнені, що хочете вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token')
      navigate("/")
    }
  }

  return (
    <nav className="fixed top-0 right-0 bg-transparent z-10 flex items-center justify-end gap-4 p-4 z-20">
      <button
        className={`px-3 py-2 rounded-xl bg-white text-xl bg-opacity-50 text-black font-candal hover:bg-orange-500 hover:text-white transition-colors duration-300 ${activeButton === "/" ? "bg-darkorange text-white" : ""}`}
        onClick={() => onTextClick("/")}
      >
        Головна
      </button>
      {isAuth ? (
        <>
        <button
          className={`px-3 py-2 rounded-xl bg-white text-xl bg-opacity-50 text-black font-candal hover:bg-orange-500 hover:text-white transition-colors duration-300 ${activeButton === "/profileclientpage" ? "bg-darkorange text-white" : ""}`}
          onClick={onProfileClick}
        >
          Профіль
        </button>
        <button
          className={`px-3 py-2 rounded-xl bg-white text-xl bg-opacity-50 text-black font-candal hover:bg-orange-500 hover:text-white transition-colors duration-300 ${activeButton === "/gallerypage" ? "bg-darkorange text-white" : ""}`}
          onClick={() => onTextClick("/gallerypage")}
        >
          Виставка
        </button>
        <button
          className={`px-3 py-2 rounded-xl bg-white text-xl bg-opacity-50 text-black font-candal hover:bg-orange-500 hover:text-white transition-colors duration-300 ${activeButton === "/loginpage" ? "bg-darkorange text-white" : ""}`}
          onClick={handleLogout}
        >
          Вийти
        </button>
        </>
      ):(
        <>
        <button
          className={`px-3 py-2 rounded-xl bg-white text-xl bg-opacity-50 text-black font-candal hover:bg-orange-500 hover:text-white transition-colors duration-300 ${activeButton === "/loginpage" ? "bg-darkorange text-white" : ""}`}
          onClick={() => onTextClick("/loginpage")}
        >
          Увійти
        </button>
        </>
      )}
    </nav>
  );
};

export default NavBar;