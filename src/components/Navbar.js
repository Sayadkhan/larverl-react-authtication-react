import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCall } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";

const Navbar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [toggle, setToggle] = useState(false);
  const inputField = useRef(null);
  const { items: data } = useSelector((state) => state.category);
  const { cartItems: product } = useSelector((state) => state.cart);

  const { items: logo } = useSelector((state) => state.logo);
  console.log(logo);
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#083344" : null,
      Font: isActive ? "font-bold" : null,
    };
  };

  const handleSearch = (e) => {
    e.preventDefault();

    //form reset
    setSearchItem("");
    inputField.current.blur();
  };
  const handleMenu = () => {
    setToggle((prev) => !prev);
  };
  const handleClose = () => {
    setToggle((prev) => !prev);
  };
  return (
    <>
      <div className="sticky px-4 md:px-0 top-0 left-0  right-0 z-[9997] bg-white">
        {" "}
        {/* middle nav */}
        <div className="bg-white/75 py-5  ">
          <div className="wrapper grid grid-cols-8 gap-3 items-center justify-between">
            <Link
              to={"/"}
              className="brand inline-block text-2xl italic font-semibold rounded-md overflow-hidden col-span-2"
            >
              <img
                src={`${process.env.REACT_APP_URL}/backend/assets/jpg/${logo?.avatar}`}
                className="w-[8rem]"
                alt=""
              />
            </Link>
            {/* search button */}
            <div className="hidden md:block col-span-4">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center justify-center"
              >
                <input
                  ref={inputField}
                  type="text"
                  value={searchItem}
                  placeholder="Search Items......"
                  onChange={(e) => setSearchItem(e.target.value)}
                  className=" bg-transparent border p-3 px-8  w-full rounded-md focus:outline-none "
                />
                <button className="absolute bg-[#C3161C] rounded-br-md rounded-tr-md  font-extrabold text-white py-2 px-4 top-0 right-0 bottom-0">
                  <FiSearch />
                </button>
              </form>
            </div>
            <div className="hidden md:block col-span-2">
              <div className="flex gap-5 items-center justify-end">
                <div className="bg-white  p-4 shadow-lg">
                  <Link to="/addtocart" className=" relative group">
                    <BsCart3 />
                    <span className=" absolute bottom-2 text-sm left-2 bg-[#C3161C] h-5 w-5 flex items-center justify-center rounded-full text-white group-hover:bg-sky-500 duration-300">
                      {product.length}
                    </span>
                  </Link>
                </div>
                {/* wishlist */}
                <div className=" bg-white  p-4 shadow-lg">
                  <AiOutlineHeart />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* lower nav */}
        <div className={`bg-[#C3161C] hidden md:block`}>
          <div className="container mx-auto">
            <div className="flex justify-center">
              <ul className="flex text-[0.9rem] text-violet-50  lg:text-[1rem] gap-5 py-2 justify-between items-center">
                <li>
                  <NavLink
                    style={navActive}
                    end
                    to={"/"}
                    className="hover:text-gray-300 duration-300"
                  >
                    Home
                  </NavLink>
                </li>
                {data?.slice(0, 6).map((navItem) => (
                  <li>
                    <NavLink
                      className="hover:text-gray-300 duration-300"
                      style={navActive}
                      to={`/categorypage/${navItem.id}`}
                      key={navItem.id}
                    >
                      {navItem?.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`bg-slate-50   ${
            toggle
              ? " absolute  left-[0rem] top-[5rem] ease-in-out duration-[500ms]"
              : " absolute  left-[-100rem] top-[5rem] ease-in-out duration-[500ms] "
          } md:hidden  w-full min-h-screen    z-[9999]  right-0 bottom-0 rounded-b-sm `}
        >
          <ul className=" flex flex-col mt-24  justify-center items-center gap-4 p-7">
            <li
              onClick={handleClose}
              className=" w-full flex justify-center items-center"
            >
              <NavLink
                end
                to={"/"}
                className=" w-full flex justify-center text-[#212121] duration-300 hover:text-[#D89307]"
              >
                Home
              </NavLink>
            </li>
            {data?.slice(0, 6).map((navItem) => (
              <li onClick={handleClose}>
                <NavLink
                  style={navActive}
                  to={`/categorypage/${navItem.id}`}
                  key={navItem.id}
                  className="text-slate-700 hover:text-slate-500 duration-300"
                >
                  {navItem.name}
                </NavLink>
              </li>
            ))}

            <li className=" text-slate-400  text-[0.9rem] flex items-center gap-2 duration-1000">
              <Link className=" hover:underline underline-offset-2 duration-300">
                Login
              </Link>
              <span className="text-slate-400/40">or</span>
              <Link className=" hover:underline underline-offset-2 duration-300 ">
                Registration
              </Link>

              <li onClick={handleClose}>
                <Link to="/addtocart" className=" relative group">
                  <BsCart3 />
                  <span className=" absolute bottom-2 text-sm left-2 text-slate-50 bg-rose-500 h-5 w-5 flex items-center justify-center rounded-full group-hover:bg-sky-500 duration-300">
                    {product.length}
                  </span>
                </Link>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

{
  /* <div className="flex gap-1 items-center ">
<MdOutlineCall />
<p>
  Help line <a href="tel://+8801878206101">+8801878206101</a>
</p>
</div>

<Link className=" hover:underline underline-offset-2 duration-300 ">
Login
</Link>
<span className="text-slate-400/40">or</span>
<Link className=" hover:underline underline-offset-2 duration-300 ">
Registration
</Link> */
}
