import React from "react";
import axios from "../axios";
import { IoIosTrash } from "react-icons/io";

const Comments = ({ comment, role }) => {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

    const handleDeleteComment = async () => {
        const commentId = comment._id;
        try {
          await axios.delete(`/gallery/${comment.painting_id}/comment`, {data: {commentId}});
          alert("Коментар видалено");
          window.location.reload();
        } catch (err) {
          console.warn("Помилка при видаленні коментаря:", err);
          alert("Помилка при видаленні картини");
        }
      };
      
    return (
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-start">
                <img
                src={`http://localhost:5000${comment.user_id.avatar}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                <p className="pt-2 mb-2 ">{comment.user_id.nikname}</p>
                <p className="">{comment.content}</p>
                <p className="text-base text-gray-300">{formatDate(comment.created_at)}</p>
                </div>
            </div>
            {role === "admin" && (
                <button
                    type="submit"
                    onClick={handleDeleteComment}
                    className="rounded-md text-white bg-gray-500 p-2 hover:bg-rose-700"
                >
                    <IoIosTrash className="w-6 h-6 text-white" />
                </button>
            )}
        </div>
      );
    };

export default Comments;