import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { IoIosArrowForward } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
export default function Loading() {
    return ( 
    <main className="flex-1 flex flex-col gap-6 px-4 w-2/3">
        <div className="flex flex-col items-center justify-center font-bold w-full">
            {/* <ProfileHeader user={data} /> */}
            <div className="flex flex-col items-center">
                {/* <img
                    src={"public/mock_user.jpeg"}
                    alt="profile picture"
                    className="w-32 h-32 object-cover rounded-full skeleton bg-white bg-opacity-10"
                /> */}
                <div className="w-32 h-32 rounded-full skeleton bg-white bg-opacity-10"></div>
            </div>
            <div className="text-2xl mt-2 bg-white opacity-10 text-transparent skeleton">Username</div>
            <div className="text-sm mt-1 bg-white opacity-10 text-transparent skeleton">user@gameshelf.com</div>
            {/* <User user={data} /> */}
                <main className="flex-row p-4 flex md:grid md:grid-cols-4 w-full">
                    <ul className="hidden md:grid col-span-1 menu bg-white bg-opacity-10 rounded-xl ml-auto mb-auto w-full">
                    <li className="menu-title text-xl text-transparent">Account</li>
                    <li>
                        <a
                        // onClick={() => setWindow("profile")}
                        // className={`${window == "profile" ? "active" : ""} block `}
                        >
                        <div className="flex flex-row justify-between items-center w-full text-transparent">
                            <p>My Profile</p>
                        </div>
                        </a>
                    </li>
                    <li>
                        <a
                        // onClick={() => setWindow("rental")}
                        // className={`${window == "rental" ? "active" : ""} block`}
                        >
                        <div className="flex flex-row justify-between items-center w-full text-transparent">
                            <p>My Rental</p>
                            {/* <span className={`${window == "rental" ? "block" : "hidden"}`}>
                            <IoIosArrowForward className="text-white" />
                            </span> */}
                        </div>
                        </a>
                    </li>
                    <li>
                        <a
                        // onClick={() => setWindow("to-pay")}
                        // className={`${window == "to-pay" ? "active" : ""}  block`}
                        >
                        <div className="flex flex-row justify-between items-center w-full text-transparent">
                            <p>To Pay</p>
                            {/* <span className={`${window == "to-pay" ? "block" : "hidden"}`}>
                            <IoIosArrowForward className="text-white" />
                            </span> */}
                        </div>
                        </a>
                    </li>
                    </ul>
                    <div className="col-span-3">
                    {/* {window == "profile" ? (
                        <UserForm user={user} setWindow={setWindow} />
                    ) : null} */}
                    <div className="bg-white bg-opacity-10 ml-4 rounded-xl p-4 flex-col flex justify-center items-center">
                        <div className="flex justify-between items-center w-full ">
                        {/* <details className="dropdown md:hidden">
                            <summary className="btn p-0 border-0 bg-white bg-opacity-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                            </summary>
                            <ul className="menu dropdown-content bg-base-100 isolation rounded-box z-1 w-52 p-2 shadow-sm">
                            <li>
                                <button>My Profile</button>
                            </li>

                            <li>
                                <button >My Rental</button>
                            </li>
                            <li>
                                <button >To Pay</button>
                            </li>
                            </ul>
                        </details> */}
                        <div className="mx-auto text-lg md:hidden text-transparent">Edit Profile</div>
                        </div>
                        <div className="hidden md:flex text-xl  flex-row mb-3 text-left  w-full justify-between">
                        <p className="text-transparent">Edit Profile </p>
                        {/* <button className="hover:text-gs_yellow opacity-0">
                            <RiEdit2Line
                            className={`text-xl text-white`}
                            />
                        </button> */}
                        </div>
                        <div className="grid grid-cols-11 gap-5 w-full">
                        {/* <Label htmlFor="id" className="font-bold md:text-md col-span-3  py-3">
                            ID :
                        </Label> */}
                        <Input
                            name="id"
                            placeholder="ID"
                            value={"userid"}
                            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent border-none text-transparent`}
                            disabled
                        />
                        {/* <Label
                            htmlFor="username"
                            className="font-bold md:text-md col-span-3  py-3 "
                        >
                            Username :
                        </Label> */}
                        <Input
                            name="username"
                            placeholder="Username"
                            value={"username"}
                            // onChange={(e) => setUsername(e.target.value)}
                            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent border-none text-transparent`}
                            disabled
                        />

                        {/* <Label
                            htmlFor="email"
                            className="font-bold md:text-md col-span-3  py-3"
                        >
                            E-mail :
                        </Label> */}
                        <Input
                            name="email"
                            placeholder="E-mail"
                            value={"user.email"}
                            className={` font-normal  col-span-8 border-white border-opacity-60 bg-transparent border-none text-transparent`}
                            disabled
                        />
                        {/* <Label
                            htmlFor="phoneNumber"
                            className="font-bold md:text-md col-span-3  py-3"
                        >
                            Phone Number :
                        </Label> */}
                        <Input
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={"phoneNumber"}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                            className={`font-normal  col-span-8 border-white border-opacity-60 bg-transparent border-none text-transparent`}
                            disabled
                        />
                        {/* <Label
                            htmlFor="location"
                            className="font-bold md:text-md col-span-3  py-3"
                        >
                            Location :
                        </Label> */}
                        <textarea
                            name="location"
                            placeholder="Location"
                            value={"location"}
                            className={` w-full font-normal bg-transparent col-span-8 border-white border-opacity-60 resize-none border-none bg-transparent py-2 px-3 opacity-0`}
                            disabled
                            // onChange={(e) => {
                            // if (editMode) setLocation(e.target.value);
                            // }}
                        />
                        </div>
                    </div>
                    {/* {window == "rental" ? (
                        <GotoPage
                        icon={<FaRegListAlt />}
                        type="rental"
                        announce="you can see your rental history in my-rental page"
                        topage="/my-rental"
                        setWindow={setWindow}
                        />
                    ) : null}
                    {window == "to-pay" ? (
                        <GotoPage
                        icon={<MdPayment />}
                        type="to-pay"
                        announce="you can pay for your rental boardgame at To-Pay page"
                        topage="/to-pay"
                        setWindow={setWindow}
                        />
                    ) : null} */}
                    </div>
                </main>
        </div>
    </main>
    );
}