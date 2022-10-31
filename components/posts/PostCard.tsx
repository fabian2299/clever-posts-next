import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Swal from "sweetalert2";
import { usePostsContext } from "../../context/posts/PostsContext";
import { Post } from "../../interface/post";
import Error from "../common/Error";
import Modal from "../common/Modal";

export default function PostCard({ post }: { post: Post }) {
  const { deletePost, updatePost } = usePostsContext();

  const [open, setOpen] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [error, setError] = useState("");

  const { title, userId, id, body } = post;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleUpdate = () => {
    if (newBody === body) return;
    if (newBody.length < 10) return;

    updatePost({ id, body: newBody });
    setOpen(false);
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
            onClick={() => setOpen(true)}
          >
            <div>
              Edit
              <AiFillEdit />
            </div>
          </button>

          <button className="post__buttons--delete" onClick={handleDelete}>
            <div>
            Delete  
            <MdDelete />
            </div>
          </button>

          <Link href={`/post/${id}`} className="post__buttons--link">
            See Post
          </Link>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="edit-modal">
          <button
            className="edit-modal__close"
            onClick={() => setOpen(false)}
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
    </>
  );
}
