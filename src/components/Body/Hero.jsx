import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useOutroContext } from "../../Provider/OutroProvider";
import { useTranslation } from "react-i18next";

const Cursor = () => {
  useEffect(() => {
    const handleMouseMove = (evt) => {
      const newMouseX = evt.clientX;
      const newMouseY = evt.clientY;

      gsap.set(".cursor", {
        x: newMouseX,
        y: newMouseY,
      });

      gsap.to(".shape", {
        x: newMouseX,
        y: newMouseY,
        stagger: -0.1,
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="cursor">{/* Cursor content */}</div>;
};

export default function Hero() {
  const [isLoaded, setisLoaded] = useState(false);
  const { globalVariable, setOpenMobileNav, setOpenlilmenu } =
    useOutroContext();
  const [t] = useTranslation();
  useEffect(() => {
    // Store the interval ID in state
    if (globalVariable) {
      setisLoaded(false);
    } else {
      const delayTask = setTimeout(() => {
        // Your code to execute after the delay
        setisLoaded(true);
      }, 800);

      // Cleanup by clearing the timeout when the component unmounts
      return () => {
        clearTimeout(delayTask); // Clear the timeout if the component unmounts
      };
    }
  }, []);
  const HandelNavClose = () => {
    setOpenlilmenu(false);
    setOpenMobileNav(false);
  };
  return (
    <div onClick={HandelNavClose} className="bg-black cursor-default">
      <div className="shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="content">
        <div>
          <h1
            className={`lg:text-9xl text-7xl font-bold ${
              !globalVariable && isLoaded
                ? "scale-y-100 delay-0"
                : "scale-y-0 delay-300"
            } transition-all ease-in-out duration-200 origin-top`}
          >
            {t("hello")}
          </h1>
        </div>
        <div>
          <h1
            className={`lg:text-3xl text-xl font-bold ${
              !globalVariable && isLoaded
                ? "scale-y-100 delay-100"
                : "scale-y-0 delay-200"
            } transition-all ease-in-out duration-200 origin-top`}
          >
            {t("my_name_is")}
          </h1>
          <h1
            className={`lg:text-5xl text-2xl font-bold ${
              !globalVariable && isLoaded
                ? "scale-y-100 delay-200"
                : "scale-y-0 delay-100"
            } transition-all ease-in-out duration-200  origin-top`}
          >
            Mohamed Addar
          </h1>
          <h1
            className={`lg:text-xl text-sm font-bold ${
              !globalVariable && isLoaded
                ? "scale-y-100 delay-300"
                : "scale-y-0 delay-0"
            } transition-all ease-in-out duration-200  origin-top`}
          >
            {t("i_am_full")}
          </h1>
        </div>
      </div>
      <Cursor />
    </div>
  );
}
