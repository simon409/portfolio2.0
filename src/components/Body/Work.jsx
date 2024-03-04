import { useState, useEffect } from "react";
import ProjectCard from "./Components/ProjectCard";
import { useOutroContext } from "../../Provider/OutroProvider";
import { useTranslation } from "react-i18next";
import Collapse from "@mui/material/Collapse/Collapse";

export default function Work() {
  const [isLoaded, setisLoaded] = useState(false);
  const { globalVariable, Data, setOpenMobileNav, setOpenlilmenu } =
    useOutroContext();
  const [Type, setType] = useState(0);
  const [filteredProjects, setfilteredProjects] = useState(null);
  const [typeMenu, settypeMenu] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    // Store the interval ID in state
    setfilteredProjects([]);
    setfilteredProjects(
      Data
        ? Type === 0
          ? Data.sort((a, b) => b.order - a.order)
          : Data.filter(
              (project) =>
                project.type ===
                (Type == 1 ? "web" : Type == 2 ? "mobile" : "ui/ux")
            ).sort((a, b) => b.order - a.order)
        : []
    );
    console.log(filteredProjects);

    if (globalVariable) {
      setisLoaded(false);
    } else {
      setType(0);
      const delayTask = setTimeout(() => {
        // Your code to execute after the delay
        setisLoaded(true);
      }, 800);

      // Cleanup by clearing the timeout when the component unmounts
      return () => {
        clearTimeout(delayTask); // Clear the timeout if the component unmounts
      };
    }
  }, [globalVariable, Data]);

  useEffect(() => {
    setisLoaded(false);
    setfilteredProjects([]);
    const timing = setTimeout(() => {
      // Your code to execute after the delay
      setfilteredProjects(
        Data
          ? Type === 0
            ? Data.filter((project) => project.status !== t("on_going")).sort(
                (a, b) => b.order - a.order
              )
            : Data.filter((project) => {
                if (Type === 4) {
                  return project.status === t("on_going");
                } else {
                  return (
                    project.type ===
                      (Type === 1 ? "web" : Type === 2 ? "mobile" : "ui/ux") &&
                    project.status != t("on_going")
                  );
                }
              }).sort((a, b) => b.order - a.order)
          : []
      );
      setisLoaded(true);
      console.log(filteredProjects);
    }, 800);

    return () => {
      clearTimeout(timing);
    };
  }, [Type, Data]);

  const HandelNavClose = () => {
    setOpenlilmenu(false);
    setOpenMobileNav(false);
  };
  const HandelTypeChange = (type) => {
    settypeMenu(false);
    setType(type);
  };

  return (
    <div
      onClick={HandelNavClose}
      className="px-[5%] 2xl:px-[10%] bg-bg-light dark:bg-bg-dark h-fit min-h-screen pb-10 w-screen"
    >
      <div
        className={`pt-[80px] bg-secondary text-white w-fit pr-5 h-[150px] lg:h-[200px] origin-left ${
          isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        } transition-all duration-200 ease-in-out`}
      >
        <div
          className={`bg-primary h-full w-fit pr-5 origin-left ${
            isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }  transition-all duration-200 ease-in-out delay-100`}
        >
          <div
            className={`bg-bg-dark dark:bg-bg-light h-full w-fit pr-5 flex origin-left ${
              isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }  transition-all duration-200 ease-in-out delay-200`}
          >
            <h1 className="text-white dark:text-[#242526] my-auto px-5 md:text-xl lg:text-3xl font-bold">
              {!isLoaded
                ? "Loading ..."
                : Type == 0
                ? t("projects")
                : Type == 1
                ? t("projects") + " - web"
                : Type == 2
                ? t("projects") + " - mobile"
                : Type == 3
                ? t("projects") + " - ui/ux"
                : t("projects") + " - " + t("on_going")}
            </h1>
          </div>
        </div>
      </div>
      <div
        id="projects"
        className={`w-full h-fit bg-slate-50 dark:bg-[#242526] mt-5 rounded-md origin-top ${
          isLoaded ? "scale-y-100" : "scale-y-0"
        } transition-all duration-300 ease-in-out delay-200`}
      >
        <div className="w-full lg:h-[80px] h-fit lg:flex lg:px-0 px-[5%] relative">
          <div className="m-auto">
            <ul className="lg:flex hidden gap-0 text-[15px] lg:gap-5 lg:text-lg p-5">
              <li
                className={`rounded-full ${
                  Type == 0 ? "border-b-2" : "border-b-0"
                } hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
              >
                <button onClick={() => HandelTypeChange(0)}>{t("all")}</button>
              </li>
              <li
                className={`rounded-full ${
                  Type == 1 ? "border-b-2" : "border-b-0"
                } hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
              >
                <button onClick={() => HandelTypeChange(1)}>Web</button>
              </li>
              <li
                className={`rounded-full ${
                  Type == 2 ? "border-b-2" : "border-b-0"
                } hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
              >
                <button onClick={() => HandelTypeChange(2)}>Mobile</button>
              </li>
              <li
                className={`rounded-full ${
                  Type == 3 ? "border-b-2" : "border-b-0"
                } hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
              >
                <button onClick={() => HandelTypeChange(3)}>UI/UX</button>
              </li>
              <li
                className={`rounded-full ${
                  Type == 4 ? "border-b-2" : "border-b-0"
                } hover:border-b-2 border-black dark:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
              >
                <button onClick={() => HandelTypeChange(4)}>
                  {t("on_going")}
                </button>
              </li>
            </ul>
          </div>
          <div className="flex w-full h-full pt-5 lg:hidden">
            <button
              onClick={() => settypeMenu(!typeMenu)}
              className="font-bold my-auto p-2 rounded-md origin-bottom transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col gap-1 items-start lg:hidden">
                <div
                  className={`w-[20px] h-[3px] bg-slate-900 dark:bg-slate-50 rounded-md origin-center ${
                    !typeMenu ? "" : "transform rotate-45 translate-y-[7px]"
                  } transition-all duration-300 ease-in-out delay-300`}
                ></div>
                <div
                  className={`w-[20px] h-[3px] bg-slate-900 dark:bg-slate-50 rounded-md origin-left ${
                    !typeMenu
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  } transition-all duration-300 ease-in-out delay-0`}
                ></div>
                <div
                  className={`w-[20px] h-[3px] bg-slate-900 dark:bg-slate-50 rounded-md origin-center ${
                    !typeMenu ? "" : "transform -rotate-45 -translate-y-[7px]"
                  } transition-all duration-300 ease-in-out delay-300`}
                ></div>
              </div>
            </button>
          </div>
          <Collapse in={typeMenu} timeout={300}>
            <div className="p-4 bg-slate-100 border-[1px] rounded-md lg:hidden">
              <ul className="flex flex-col text-[15px] gap-2 lg:text-lg">
                <li
                  className={`rounded-md ${
                    Type == 0
                      ? "border-black bg-slate-50"
                      : "border-transparent"
                  } border-[1px] hover:border-black dark:hover:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
                >
                  <button
                    className="w-full h-full text-start"
                    onClick={() => HandelTypeChange(0)}
                  >
                    {t("all")}
                  </button>
                </li>
                <li
                  className={`rounded-md ${
                    Type == 1
                      ? "border-black bg-slate-50"
                      : "border-transparent"
                  } border-[1px] hover:border-black dark:hover:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
                >
                  <button
                    className="w-full h-full text-start"
                    onClick={() => HandelTypeChange(1)}
                  >
                    Web
                  </button>
                </li>
                <li
                  className={`rounded-md ${
                    Type == 2
                      ? "border-black bg-slate-50"
                      : "border-transparent"
                  } border-[1px] hover:border-black dark:hover:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
                >
                  <button
                    className="w-full h-full text-start"
                    onClick={() => HandelTypeChange(2)}
                  >
                    Mobile
                  </button>
                </li>
                <li
                  className={`rounded-md ${
                    Type == 3
                      ? "border-black bg-slate-50"
                      : "border-transparent"
                  } border-[1px] hover:border-black dark:hover:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
                >
                  <button
                    className="w-full h-full text-start"
                    onClick={() => HandelTypeChange(3)}
                  >
                    UI/UX
                  </button>
                </li>
                <li
                  className={`rounded-md ${
                    Type == 4
                      ? "border-black bg-slate-50"
                      : "border-transparent"
                  } border-[1px] hover:border-black dark:hover:border-white text-black dark:text-white px-4 py-1 transition-all duration-100 ease-in-out`}
                >
                  <button
                    className="w-full h-full text-start"
                    onClick={() => HandelTypeChange(4)}
                  >
                    {t("on_going")}
                  </button>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>

        {filteredProjects && filteredProjects.length > 0 ? (
          <div className="p-4">
            <ol className="group/list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((data) => (
                <ProjectCard
                  title={data.title}
                  smdesc={data.description}
                  key={data.id}
                  id={data.id}
                  isLoaded={isLoaded}
                  bgcolor={data.color}
                  logo={data.logo}
                />
              ))}
            </ol>
          </div>
        ) : (
          <div className="p-4 text-black dark:text-white w-full text-center">
            {isLoaded ? "No project of this type yet" : "Loading ..."}
          </div>
        )}
      </div>
    </div>
  );
}
