import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";
import BackgroundImage from "../components/BackgroundImage";

const RegisterPage = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues: { 
      email: '', 
      password: '', 
      status: ''
    },
  })

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchRegister(values));
      console.log(data);
      if (!data.payload) {
        throw new Error('Не вдалось зареєструватись!');
      }

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.warn(err);
			alert(err.response?.data?.message || 'Пароль повинен містити 5 і більше символів.');
    }
  };

useEffect(() => {
  if (isAuth) {
    navigate("/");
  }
}, [isAuth, navigate]);

  const onLoginClick = useCallback(() => {
    navigate("/loginpage");
  }, [navigate]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <BackgroundImage src="main.png"/>
      <div className="z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-10 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-8">Реєстрація</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mr-4">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text- font-bold mb-2"
              htmlFor="email">
              Електронна пошта
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md"
              type="email"
              placeholder="Електронна пошта"
              aria-describedby="email-error"
              {...register('email', { required: 'Вкажіть пошту'})}/>
            {errors.email && <p id="email-error" className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4 w-full relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Пароль
            </label>
            <div className="relative">
              <input
                className="w-full mb-4 p-3 border border-gray-300 rounded-md pr-3}"
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                aria-describedby="password-error"
                {...register('password', { required: 'Вкажіть пароль'})}/>
              <button
                type="button"
                className="absolute top-1/3 right-1 transform -translate-y-1/2 bg-white"
                onClick={toggleShowPassword}>
                {showPassword ? <IoIosEyeOff className="w-6 h-6 bg-white"/> : <IoIosEye className="w-6 h-6 bg-white" />}
              </button>
              {errors.password && <p id="password-error" className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>
          <div className="w-full mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status">
              Виберіть роль:
            </label>
            <select
              id="status"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              aria-describedby="status-error"
              {...register('status', { required: 'Виберіть роль'})}
            >
              <option value="">Оберіть роль</option>
              <option value="artist">Художник</option>
              <option value="user">Відвідувач</option>
            </select>
            {errors.status && <p id="status-error" className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
          <button
            className="w-full bg-orange-500 text-white text-xl font-caladea font-bold py-3 px-4 mt-8 rounded-xl hover:bg-orange-700"
            type='submit'>
            Зареєструватись
          </button>
        </form>
        <div className="text-center mt-4">
          Вже є акаунт?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>
            Вхід
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;