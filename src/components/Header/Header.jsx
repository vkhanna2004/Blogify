import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className=" p-3  top-0  shadow bg-gray-950  ">
      <Container>
        <nav className="flex">
          <div className="flex justify-center items-center rounded-xl text-white hover:text-zinc-300 ">
            <Link to="/" className="flex justify-center items-center p-2  ">
              <h1 className=" text-2xl font-bold pl-4 text-teal-400">BLOGIFY</h1>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={` inline-block px-6 py-2 text-lg duration-200 text-gray-200 font-medium hover:bg-teal-500 hover:text-black rounded-full ${window.location.pathname === item.slug ? "text-teal-500 underline text-decoration-underline" : "" }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
