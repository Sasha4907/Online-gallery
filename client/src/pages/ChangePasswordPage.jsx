import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";
import BackgroundImage from "../components/BackgroundImage";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChangePassword = async(event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const passwordData = { id: userId, oldPassword, newPassword };
			const { data } = await axios.patch(`/auth/user/password/${userId}`, passwordData);
			alert('Пароль змінено!')
      setOldPassword("");
      setNewPassword("");
		} catch (err) {
			console.warn(err);
			alert(err.response?.data?.message || 'Помилка при зміні паролю')
    } finally {
			setLoading(false);
		}
	};

  useEffect(() => {
	  if (!window.localStorage.getItem('token') && !isAuth) {
		navigate("/");
	  }
	});

	const onGroupClick = useCallback(() => {
		navigate(`/profileclientpage/${userId}`);
	}, [navigate]);

  return (
    <>
      <BackgroundImage src="gallery.png" />
      <button className="fixed top-0 left-0 mt-4 ml-6 w-12 h-12 bg-transparent z-10" onClick={onGroupClick}>
        <IoArrowBackCircleOutline className="w-full h-full text-white hover:text-silver" />
      </button>
      <div className="grid place-items-center h-dvh text-xl">
        <form onSubmit={handleChangePassword} className="grid place-items-center gap-10 bg-white px-20 py-12 rounded-3xl">
          <div className="flex flex-col gap-4 w-full justify-center items-end font-caladea">
            <div className="flex gap-4 items-center">
              <p>Теперішній пароль:</p>
              <Input 
                placeholder="введіть теперішній пароль" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-4 items-center">
              <p>Новий пароль:</p>
              <Input 
                placeholder="введіть новий пароль" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
          </div>
          <PrimaryButton className="bg-darkorange" type="submit" onClick={handleChangePassword}>Зберегти</PrimaryButton>
        </form>
      </div>
    </>
  )
}