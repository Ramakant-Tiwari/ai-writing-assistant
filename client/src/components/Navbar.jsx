import { Link, NavLink } from "react-router";
import { usePrivy } from "@privy-io/react-auth";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const [showMenu, setShowMenu] = useState(false);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    (showMenu && (
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white fixed top-0 w-full z-1 h-full">
        <div className="relative w-full">
          <div className="absolute top-8 w-full flex max-md:justify-center justify-end md:right-10">
            <button onClick={() => setShowMenu(false)}>
              <IoMdClose className="text-4xl" />
            </button>
          </div>
        </div>
        <div className="container mx-auto mt-16 flex flex-col justify-between items-center">
          <div className="flex items-center mt-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <FaPencilAlt className="text-4xl" /> {/* Logo icon */}
              <span className="text-4xl">AI Writing Assistant</span>
            </Link>
          </div>
          <nav>
            <ul className="container flex flex-col justify-center items-center text-2xl gap-2 mt-4">
              <li onClick={() => setShowMenu(false)}>
                <NavLinkWrapper to="/">Home</NavLinkWrapper>
              </li>
              <li onClick={() => setShowMenu(false)}>
                <NavLinkWrapper to="/about">About</NavLinkWrapper>
              </li>
              <li onClick={() => setShowMenu(false)}>
                {authenticated && (
                  <NavLinkWrapper to="/write">Write</NavLinkWrapper>
                )}
              </li>
              <li>
                {authenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      login();
                      setShowMenu(false);
                    }}
                    className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )) || (
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <FaPencilAlt className="text-2xl" /> {/* Logo icon */}
              <span>AI Writing Assistant</span>
            </Link>
          </div>
          <div>
            <button onClick={() => setShowMenu(true)}>
              <AiOutlineMenu className="text-4xl" />
            </button>
          </div>
        </div>
      </nav>
    )
  );
};

const NavLinkWrapper = ({ to, children }) => (
  <NavLink
    to={to}
    className="text-white hover:text-blue-200 transition duration-300"
  >
    {children}
  </NavLink>
);

export default Navbar;
