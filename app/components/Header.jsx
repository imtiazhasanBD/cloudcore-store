"use client";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";


const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const pathname = usePathname();
  const router = useRouter();
  
    // To hide the back botton on homepage
    const isHomePage = pathname === "/";

  console.log(isHomePage);
  

  return (
    <header className="bg-green-700 flex justify-between sm:gap-10 items-center sm:px-12 py-3 sticky top-0 z-40 px-5 max-w-[1400px] mx-auto">
      <Link href={"/"}>
        <div className="md:text-2xl sm:text-md text-xl font-bold text-white hidden sm:block">
          Cloudcare Store
        </div>
      </Link>

      {!isHomePage && (
        <button
          onClick={ () => router.back()}
          className="text-white m-auto text-center pr-2 md:hidden"
        >
          <BiArrowBack size={"1.7rem"} />
        </button>
      )}

      <div className="flex justify-between items-center px-5 py-2 bg-gray-100 rounded sm:w-[60%] w-full">
        <input
          type="text"
          placeholder="Search product"
          className="bg-transparent outline-0 w-full"
        />
        <button className="text-blue-600 font-bold text-lg">
          <CiSearch />
        </button>
      </div>

      <div className="flex gap-8 justify-center items-center text-lg text-white font-bold">
        <button className="justify-center items-center gap-2 text-sm hidden sm:flex">
          <CgProfile className="text-3xl" />
          <p className="hidden md:block">Account</p>
        </button>
        <Link href={"/cart"}>
          <button className="flex justify-center items-center gap-2 text-sm cursor-pointer ml-4 sm:ml-0">
            <span className="relative">
              <BsCart3 className="text-2xl" />
              <span className="px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3">
                {cart.length === 0 ? 0 : cart.length}
              </span>
            </span>
            <p className="hidden md:block">Cart</p>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
