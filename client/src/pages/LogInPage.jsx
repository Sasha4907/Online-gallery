import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";

import BackgroundImage from "../components/BackgroundImage";

const LogInPage = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues: { email: '', password: ''},
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    console.log(data);
    if(!data.payload) {
      return alert('Невірний пароль або пошта.');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const onRegisterClick = useCallback(() => {
    navigate("/registerpage");
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <BackgroundImage src="main.png"/>
      <div className="z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-10">
        <h2 className="flex flex-col items-center text-3xl font-semibold mb-8">Авторизація</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mr-4">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="email"
            >
              Електронна пошта
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md"
              type="email"
              placeholder="Електронна пошта"
              aria-describedby="email-error"
              {...register('email', { required: 'Вкажіть пошту'})}              
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="password"
            >
              Пароль
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md"
              type="password"
              placeholder="Пароль"
              aria-describedby="password-error"
              {...register('password', { required: 'Вкажіть пароль'})}
            />
            {errors.password && <p id="password-error" className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            className="w-full bg-orange-500 text-white text-xl font-caladea font-bold py-3 px-4 rounded-xl hover:bg-orange-700"
            type='submit'>
            Вхід
          </button>
        </form>
        <div className="mt-4 text-center">
          Не маєте акаунту?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={onRegisterClick}
          >Реєстрація</span>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;