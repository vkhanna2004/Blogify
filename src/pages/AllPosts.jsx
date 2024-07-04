import React, { useState, useEffect } from "react";
import { Container, Loader, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Query } from "appwrite";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      authService.getCurrentUser().then((userData) => {
        if (userData) {
          appwriteService
            .getPosts([Query.equal("userId", userData.$id)])
            .then((posts) => {
              if (posts) {
                setPosts(posts.documents);
              }
            });
        }
      });
    } catch (error) {
      console.log("AllPosts :: fetchPosts", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Loader className1="h-20 w-20 bg-zinc-800" className2="bg-zinc-800"/>
  ) : !(posts.length === 0) ? (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-zinc-200 text-xl mb-4">All Posts You Have Created:</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-zinc-200 text-xl mb-4">
              You have not posted anything yet!
            </h1>
            <Link
              to="/add-post"
              className="text-teal-500 text-xl mb-4 font-medium text-primary transition-all duration-200 hover:underline "
            >
              Ready to share? Click her to write your first post! 
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
