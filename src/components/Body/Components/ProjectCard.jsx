/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({
  title,
  smdesc,
  isLoaded,
  id,
  bgcolor,
  logo
}) {
  const [Hovered, setHovered] = useState(false);
  return (
    <li
      className={`${
        Hovered ? "dark:bg-[#525252] bg-gray-100" : ""
      } md:max-w-1/2 lg:max-w-1/4 m-1 p-3 border-2 lg:border-0 origin-top rounded-lg ${
        isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      } transition-all duration-500 ease-in-out group lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}
    >
      <a href={`project/${id}`} onMouseOver={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} className="cursor-pointer">
        <div className="flex flex-col">
          <div id="image" className="w-full h-[300px]">
            {
              logo ?(
                <div className={`w-full h-[300px] relative rounded-lg border-black border-2 z-10 flex`} style={{ backgroundColor: bgcolor }}>
                  <img src={logo} className="object-cover h-30 m-auto" alt="" />
                </div>
              ) : (
                <div className="w-full h-[300px] relative bg-[#000] rounded-lg border-black border-2">
                  <img src="https://via.placeholder.com/300" className="object-cover" alt="" />
                </div>
              )
            }
          </div>
          <div className="flex lg:justify-between lg:flex-row flex-col lg:mb-0 mb-2">
            
            <div id="title" className="py-2 flex gap-5">
              <h1
                className={`text-3xl text-bg-dark dark:text-bg-light font-bold overflow-hidden h-10 ${
                  isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                } transition-all duration-150 ease-in-out delay-700`}
              >
                {title}
              </h1>
              <div className="w-[40px] h-[40px] lg:flex md:flex hidden">
                <p
                  className={`dark:text-white text-black text-2xl origin-top ${
                    Hovered
                      ? "translate-x-0 translate-y-0"
                      : "-translate-x-1/2 translate-y-1/4"
                  } transition-transform ease-in-out duration-200`}
                >
                  <FiArrowUpRight />
                </p>
              </div>
            </div>
          </div>
          <div
            id="description_tags"
            className={`border-t-4 border-black dark:border-white py-4 flex flex-col md:flex-col lg:flex-row gap-3 justify-between origin-left ${
              isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            } transition-all duration-300 ease-in-out delay-500`}
          >
            <div className="my-auto">
              <p
                className={`text-black dark:text-bg-light origin-top ${
                  isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                } transition-all duration-150 ease-in-out delay-700 text-start`}
              >
                {smdesc.length > 50 ? smdesc.substring(0, 50) + "..." : smdesc}
              </p>
            </div>
            
          </div>
        </div>
      </a>
    </li>
  );
}
