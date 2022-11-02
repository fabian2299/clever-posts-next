import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import usePostsContext from "../../hooks/usePostsContext";
import { Post } from "../../interface/post";
import Error from "../common/Error";
import Modal from "../common/Modal";

export default function PostCard({ post }: { post: Post }) {
  const { deletePost, updatePost } = usePostsContext();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [error, setError] = useState("");

  const { title, userId, id, body } = post;

  const handleDelete = () => {
    deletePost(id);
    setOpenModalDelete(false);
    toast.success("Post deleted");
  };

  const handleUpdate = () => {
    if (newBody === body) return;
    if (newBody.length < 10) return;

    updatePost({ id, body: newBody });
    setOpenModalUpdate(false);
    toast.success("Post updated successfully");
  };

  useEffect(() => {
    if (newBody.length < 10) {
      setError("Body must be at least 10 characters");
    } else {
      setError("");
    }
  }, [newBody]);

  return (
    <>
      <div className="post">
        <p className="post__user">user: {userId}</p>

        <h2 className="post__title">{title}</h2>

        <p className="post__body">{body}</p>

        <div className="post__buttons">
          <button
            className="post__buttons--update"
            onClick={() => setOpenModalUpdate(true)}
          >
            <div>
              Edit
              <AiFillEdit />
            </div>
          </button>

          <button
            className="post__buttons--delete"
            onClick={() => setOpenModalDelete(true)}
          >
            <div>
              Delete
              <MdDelete />
            </div>
          </button>

          <Link href={`/posts/${id}`} className="post__buttons--link">
            See Post
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
              close
            </button>

            <h3 className="delete-modal__heading">
              Are you sure you want to delete the post with id:{" "}
              <span>{id}</span>?
            </h3>

            <div className="delete-modal__buttons">
              <button onClick={handleDelete} className="delete-modal__confirm">
                Yes, Delete Post
              </button>

              <button
                onClick={() => setOpenModalDelete(false)}
                className="delete-modal__close"
              >
                Cancel
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
              close
            </button>

            {error && <Error error={error} />}

            <textarea
              name="content"
              id="content"
              className="edit-modal__textarea"
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Enter new content"
            />

            <button
              className="edit-modal__update"
              onClick={handleUpdate}
              disabled={!!error}
            >
              Update
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
