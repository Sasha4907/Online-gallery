import { configureStore } from "@reduxjs/toolkit";
import { picturesPeducer } from "./slices/picture";
import commentsReducer from "./slices/comment";
import { authPeducer } from "./slices/auth";
import favoriteSlice from "./slices/favorite";

const store = configureStore ({
    reducer: {
        pictures: picturesPeducer,
        comments: commentsReducer,
        favorite: favoriteSlice,
        auth: authPeducer
    }
})

export default store;