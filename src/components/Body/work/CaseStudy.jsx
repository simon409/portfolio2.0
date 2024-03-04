import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useOutroContext } from '../../../Provider/OutroProvider';
import { FaCopy, FaGithub, FaGlobe, FaCode, FaDatabase,  } from 'react-icons/fa'
import { TbApi, TbSettingsCode } from "react-icons/tb";

const CaseStudy = () => {
    const { id } = useParams();
    const { globalVariable, Data, setOpenMobileNav, setOpenlilmenu } = useOutroContext();
    const [isLoaded, setisLoaded] = useState(false);
    const [project, setproject] = useState({});
    const [bgcolor, setbgcolor] = useState("#fff");
    const [textColor, settextColor] = useState("#000");
    const [usernameOrMail, setusernameOrMail] = useState("");
    const [password, setpassword] = useState("")

    useEffect(() => {
      // Store the interval ID in state
      setproject([]);
      const projectdata = Data.filter((project) =>project.id ===id);
      
      if(projectdata.length > 0){
        setproject(projectdata[0]);
        setbgcolor(projectdata[0].color);
        getLuminance(projectdata[0].color);
        const logins = projectdata[0].logininfos.split(",");
        setusernameOrMail(logins[0]);
        setpassword(logins[1]);
      }
  
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
    }, [globalVariable, Data]);


    function getLuminance(hex) {
      // Convert hex to RGB
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
    
      // Calculate luminance
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    
      if(luminance > 186){
        settextColor("#000");
      }
      else{
        settextColor("#fff");
      }
    }
    const HandelNavClose = () => {
      setOpenlilmenu(false);
      setOpenMobileNav(false);
    };

    const HandelCopy = (theone) => {
      if(theone == 0){
        //copy username
        navigator.clipboard.writeText(usernameOrMail);
        console.log(usernameOrMail);
      }
      else{
        //copy password
        navigator.clipboard.writeText(password);
      }
      //navigator.clipboard.writeText(e.target.value);
    }
  return (
    <div onClick={HandelNavClose} className='w-screen min-h-screen bg-white dark:bg-black h-fit flex flex-col items-center pt-24'>
      <div className="container flex flex-col gap-5">
        <div className={`w-full rounded-lg flex flex-col-reverse lg:flex-row justify-between gap-10 items-center p-8 lg:p-12 border-black border-2`} style={{ backgroundColor: bgcolor }}>
          
          <div className='flex flex-col justify-center'>
            <h1 className='text-4xl lg:text-6xl font-bold text-start mb-4' style={{ color: textColor }}>{project.title}</h1>
            <p className='text-lg lg:text-xl leading-relaxed mb-6' style={{ color: textColor }}>{project.description}</p>
          </div>
          <div className='flex justify-start items-center'>
            <img src={project.logo} alt="" className='w-fit object-cover rounded-md' />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          <div className="bg-blue-100 w-full md:w-1/2 rounded-lg p-4">
            <h1 className='text-2xl font-bold text-start'>Available links</h1>
            <ul className='mt-2'>
              {
                project.link !== "" && (
                  <li className='p-2'>
                    <a href={project.link} target="_blank" rel="noreferrer" className='hover:underline flex gap-2 items-center'><FaGlobe /> {project.title}</a>
                  </li>
                )
              }
              {
                project.github !== "" && (
                  <li className='p-2'>
                    <a href={project.github} target="_blank" rel="noreferrer" className='hover:underline flex gap-2 items-center'><FaGithub /> {project.title}</a>
                  </li>
                )
              }
              {
                project.link == "" && project.github == "" && (
                    <li className='p-2'>
                      <p>No link available</p>
                    </li>
                  )
              }
            </ul>
          </div>
          <div className="bg-orange-100 w-full md:w-1/2 rounded-lg p-4" >
            <h1 className='text-2xl font-bold text-start'>Guest login</h1>
            
              {
                usernameOrMail != "" && password != "" ? (
                  <ul className='list-item mt-2 list-disc ml-5'>
                    <li className='p-2'>
                      <p>Username: {usernameOrMail} <button onClick={()=>HandelCopy(0)}><FaCopy/></button></p>
                    </li>
                    <li className='p-2'>
                      <p>Password: {password.length > 0 ? "*".repeat(password.length) : ""} <button onClick={()=>HandelCopy(1)}><FaCopy/></button></p>
                    </li>
                  </ul>
                ) : (
                  <ul className='list-item mt-2 list-disc ml-5'>
                    <li className='p-2'>
                      <p>No guest login available</p>
                    </li>
                  </ul>
                )
              }
            
          </div>
        </div>
        <div className='flex flex-col gap-5 mb-5 text-black dark:text-white'>
          {/*project overview */}
          {
            project.project_overview !== "" && (
              <div>
                <h1 className='text-2xl font-bold text-start uppercase text-blue-500 dark:text-blue-300'>Project overview</h1>
                <p className='mt-2'>{project.project_overview}</p>
              </div>
            )
          }
          {/*tech stack */}
          <div>
            <h1 className='text-2xl font-bold text-start uppercase text-blue-500 dark:text-blue-300'>Tech stack</h1>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            
          {/*fontend */}
          {
            project.front_tech !== "" && (
              <div>
                <h1 className='text-xl font-bold text-start uppercase text-orange-500 dark:text-orange-300 flex items-center gap-2'><FaCode /> Frontend</h1>
                <ul className="list-disc ml-5">
                  {
                    project.front_tech && project.front_tech.split(",").map((tech, index) => {
                      return (
                        <li key={index} className='mt-2'>{tech}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }

          {/*backend */}
          {
            project.back_tech !== "" && (
              <div>
                <h1 className='text-xl font-bold text-start uppercase text-orange-500 dark:text-orange-300 flex items-center gap-2'><TbSettingsCode/> Backend</h1>
                <ul className="list-disc ml-5">
                  {
                    project.back_tech && project.back_tech.split(",").map((tech, index) => {
                      return (
                        <li key={index} className='mt-2'>{tech}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }

          {/*database */}
          {
            project.db_tech !== "" && (
              <div>
                <h1 className='text-xl font-bold text-start uppercase text-orange-500 dark:text-orange-300 flex items-center gap-2'><FaDatabase /> Database</h1>
                <ul className="list-disc ml-5">
                  {
                    project.db_tech && project.db_tech.split(",").map((tech, index) => {
                      return (
                        <li key={index} className='mt-2'>{tech}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
          {/*api*/}
          {
            project.api !== "" && (
              <div>
                <h1 className='text-xl font-bold text-start uppercase text-orange-500 dark:text-orange-300 flex items-center gap-2'><TbApi/> API</h1>
                <ul className="list-disc ml-5">
                  {
                    project.api && project.api.split(",").map((tech, index) => {
                      return (
                        <li key={index} className='mt-2'>{tech}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          }
          </div>

          {/*images */}
          <div className='mt-5 '>
            <h1 className='text-2xl font-bold text-start uppercase text-blue-500 dark:text-blue-300'>project Images</h1>
          </div>
          <div>
                <ul className="list-disc ml-5">
                  <li className='mt-2'>There is no images right now, i will update them shortly.</li>
                </ul>
              </div>
          
        </div>
      </div>
    </div>

  )
}

export default CaseStudy