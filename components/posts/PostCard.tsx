import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillEdit,
  AiFillHeart,
  AiOutlineArrowRight,
  AiOutlineHeart,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import usePostsContext from "../../hooks/usePostsContext";
import { Post } from "../../interface/post";
import Error from "../common/Error";
import Modal from "../common/Modal";

export default function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation("common");
  const { deletePost, updatePost, addToFavourites, favourites } =
    usePostsContext();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [error, setError] = useState("");

  const { title, userId, id, body, userName } = post;

  const isInFavourites = favourites?.some((fav) => fav.id === id);

  const handleDelete = () => {
    deletePost(id);
    setOpenModalDelete(false);
    toast.success(t("posts.deleted"));
  };

  const handleUpdate = () => {
    if (newBody === body) return;
    if (newBody.length < 10) return;

    updatePost({ id, body: newBody });
    setOpenModalUpdate(false);
    toast.success(t("posts.updated"));
  };

  const handleFavourite = () => {
    addToFavourites(id);
  };

  useEffect(() => {
    if (newBody.length < 10) {
      setError(t("posts.update-error"));
    } else {
      setError("");
    }
  }, [newBody, t]);

  return (
    <>
      <div className="post fade-in">
        <div className="post__header">
          <p className="post__header__user">{userName}</p>

          <button onClick={handleFavourite} className="post__header__btn">
            {isInFavourites ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>

        <h2 className="post__title">{title}</h2>

        <p className="post__body">{body}</p>

        <div className="post__buttons">
          <button
            className="post__buttons--update"
            onClick={() => setOpenModalUpdate(true)}
          >
            <div className="post__buttons__group">
              {t("posts.edit")}
              <AiFillEdit className="post__buttons__svg" />
            </div>
          </button>

          <button
            className="post__buttons--delete"
            onClick={() => setOpenModalDelete(true)}
          >
            <div className="post__buttons__group">
              {t("posts.delete")}
              <MdDelete className="post__buttons__svg" />
            </div>
          </button>

          <Link href={`/posts/${id}`} className="post__buttons--link">
            <div className="post__buttons__group">
              {t("posts.see-all")}
              <AiOutlineArrowRight className="post__buttons__svg" />
            </div>
          </Link>
        </div>
      </div>

      {openModalDelete && (
        <Modal
          isOpen={openModalDelete}
          onClose={() => setOpenModalDelete(false)}
        >
          <div className="delete-modal">
            <button
              className="delete-modal__close"
              onClick={() => setOpenModalDelete(false)}
            >
              {t("posts.close-button")}
            </button>

            <h3 className="delete-modal__heading">{t("posts.delete-modal")}</h3>

            <div className="delete-modal__buttons">
              <button onClick={handleDelete} className="delete-modal__confirm">
                {t("posts.delete-modal-button")}
              </button>

              <button
                onClick={() => setOpenModalDelete(false)}
                className="delete-modal__close"
              >
                {t("posts.delete-modal-cancel")}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {openModalUpdate && (
        <Modal
          isOpen={openModalUpdate}
          onClose={() => setOpenModalUpdate(false)}
        >
          <div className="edit-modal">
            <button
              className="edit-modal__close"
              onClick={() => setOpenModalUpdate(false)}
            >
              {t("posts.close-button")}
            </button>

            {error && <Error error={error} />}

            <textarea
              name="content"
              id="content"
              className="edit-modal__textarea"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
            />

            <button
              className="edit-modal__update"
              onClick={handleUpdate}
              disabled={!!error}
            >
              {t("posts.edit-modal-button")}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
