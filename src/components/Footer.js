import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  // const { items: data } = useSelector((state) => state.category);
  const { items: footerData } = useSelector((state) => state.footerDetails);

  const { items: data } = useSelector((state) => state.banner);
  const { items: logo } = useSelector((state) => state.logo);
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#06b6d4" : null,
    };
  };
  return (
    <div className="  bg-[#252524] text-slate-50 md:px-10 md:py-8 p-4 mt-20">
      <div className="container mx-auto gap-5 flex flex-col lg:flex-row justify-between ">
        <div className="  ">
          <span className="font-light w-[15rem] sm:w-[25rem] md:w-[40rem]  gap-3 flex flex-col   2xl:flex-row lg:flex-col  justify-between  text-sm">
            <span className="flex flex-col mb-5">
              <h4 className="mb-2">Sombhaar</h4>

              <p>
                Feel the Most Trusted Online Shopping Experience in Bangladesh.
              </p>
            </span>
            <div className="flex flex-col">
              <h2 className="text-md mb-4 font-light">
                Subscribe to Our Newsletter
              </h2>
              <form>
                <div className="flex flex-col md:flex-row items-start gap-2 mb-4">
                  {/* <label className="sr-only" htmlFor="email">
                Email Address
              </label> */}
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="bg-slate-50 rounded-lg py-2 px-4 text-white w-[15rem]"
                  />
                  <button
                    type="submit"
                    className="bg-black rounded-lg py-2 px-4"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </span>
          <img
            src={`${process.env.REACT_APP_URL}/backend/assets/jpg/${logo?.avatar}`}
            className="w-[14rem] mb-5"
            alt=""
          />

          <div className="flex  items-center gap-4">
            <h2 className="text-md font-light">Follow Us</h2>
            <div className="flex items-center">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 mr-4"
              >
                <FaFacebook />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:hover:text-blue-400 mr-4"
              >
                <FaTwitter />
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-400"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row items-start justify-between mt-4 md:mt-0 gap-10 2xl:gap-32">
          <div className="flex flex-col">
            <h2 className="text-md mb-2 text-[#e7e4e2] ">Useful Links</h2>
            <NavLink
              style={navActive}
              to={"/"}
              end
              className=" inline-block text-sm font-light text-slate-50 "
            >
              Home
            </NavLink>

            <Link
              to="terms"
              className=" inline-block text-sm font-light text-slate-50 "
            >
              Terms & conditions
            </Link>

            <Link
              to="returnpolicy"
              className=" inline-block text-sm font-light text-slate-50"
            >
              Return policy
            </Link>
            <Link
              to="supportpolicy"
              className=" inline-block text-sm font-light text-slat NavLink
            "
            >
              Support Policy
            </Link>
            <Link
              className=" inline-block text-sm font-light text-slat NavLink
            "
              to="privacypolicy"
            >
              Privacy policy
            </Link>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-md mb-2 text-[#e7e4e2]  ">Company</h2>

            {footerData?.slice(0, 5).map((navItem) => (
              <NavLink
                style={navActive}
                to={`/${navItem.slug}/${navItem.id}`}
                key={navItem.id}
                className="text-slate-50 text-sm  font-light"
              >
                {navItem.title}
              </NavLink>
            ))}

            <Link
              to={"/mehendi-review/53"}
              className=" inline-block text-sm font-light text-slate-50"
            >
              About us
            </Link>
            <Link
              to={"/sellcondition"}
              className=" inline-block text-sm font-light text-slate-50"
            >
              Contact us
            </Link>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-md mb-2 text-[#e7e4e2] ">Contact info</h2>
            <Link className=" inline-block text-sm font-light text-slate-50 ">
              612/2- Middle Monipur, Dhaka 1216
            </Link>

            <a
              href="tel://+8801878206101"
              className=" inline-block text-sm font-light text-slate-50"
            >
              Phone: +8801878206101
            </a>
            <a
              href="mailto:info@sombhaar.com"
              className="inline-block text-sm font-light text-slat NavLink"
            >
              Email: info@sombhaar.com
            </a>
          </div>
        </div>
      </div>
      <footer className="footer container mx-auto flex items-center justify-between    gap-5  text-slate-50 ">
        <div className="flex justify-center">
          <p className="text-slate-50 text-sm font-light mt-5">
            &copy; {new Date().getFullYear()} Reserved by Sombhaar
          </p>
        </div>
        <div className="image-container w-72 2xl:w-[30rem] ">
          <img
            src="https://www.old.mehendibymimi.com/public/uploads/all/lnfIO3PdB1OE45OgRLmHu8fZdLRselIYRdKpAyam.png"
            alt=""
          />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
