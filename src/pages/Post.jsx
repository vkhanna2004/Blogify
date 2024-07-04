import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    setLoading(true);
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
    setLoading(false);
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return loading ? (
    <Loader className1="h-20 w-20 bg-zinc-800" className2="bg-zinc-800" />
  ) : post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative  outline outline-gray-500 rounded-xl p-2">
          <div className="object-cover bg-black/35 aspect-ratio-16/9">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl h-full w-full   text-white rounded-t-lg aspect-video object-center overflow-hidden"
            />
          </div>
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500 rounded-xl" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500 rounded-xl" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col text-white bg-black/35 p-4 outline outline-gray-500 rounded-xl">
          <div className="w-full mb-6">
            <h1 className="text-4xl font-bold text-white text-decoration: underline ">
              {post.title}
            </h1>
          </div>
          <div className="browser-css text-xl text-white items-start">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
