import { IoNotifications } from "react-icons/io5";
import AuthButton from "./header-auth";

export const NavbarGetStarted = () => {
  return (
    <>
      <div className="navbar bg-transparent">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="/home">
            GameShelf
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="flex flex-row  items-center justify-center">
            <div className="hidden flex-row  items-center justify-center lg:flex mr-16">
              <ul className="menu menu-horizontal md:px-1 gap-8">
                <li className="">
                  <a href="/home">Home</a>
                </li>
                <li>
                  <a href="/games">Boardgame</a>
                </li>
                <li>
                  <a href="/providers">Provider</a>
                </li>
                <li>
                  <a href="/support">Support</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
