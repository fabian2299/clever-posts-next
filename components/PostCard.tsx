import { Post } from "../interface/post";
import { usePostsContext } from "../context/posts/PostsContext";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Link from "next/link";
import Error from "./Error";
import toast from "react-hot-toast";

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
      <div className="flex flex-col gap-4 rounded-md border-2 hover:scale-110 p-4 text-center">
        <p>user: {userId}</p>

        <h2>{title}</h2>

        <p>{body}</p>

        <div className="flex gap-4">
          <button
            className=" bg-blue-700 text-white py-2 px-4 rounded-md w-fit mx-auto"
            onClick={() => setOpen(true)}
          >
            Edit Post
          </button>

          <button
            className=" bg-red-700 text-white py-2 px-4 rounded-md w-fit mx-auto"
            onClick={handleDelete}
          >
            Delete Post
          </button>
        </div>

        <Link
          href={`/post/${id}`}
          className=" bg-green-700 text-white py-2 px-4 rounded-md w-full"
        >
          See Post
        </Link>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-10">
          <button
            className="rounded-md bg-red-600 py-2 px-4 text-white w-fit self-end"
            onClick={() => setOpen(false)}
          >
            Close
          </button>

          {error && <Error error={error} />}

          <textarea
            name="content"
            id="content"
            cols={30}
            rows={10}
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />

          <button
            className="rounded-md bg-green-600 py-3 px-2 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpdate}
            disabled={!!error}
          >
            Update Post
          </button>
        </div>
      </Modal>
    </>
  );
}
