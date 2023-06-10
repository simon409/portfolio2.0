import React from 'react'
import InteractiveModel from './3d stuff/InteractiveModel'
import { FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom/dist'
import './style.css'

export default function Index() {
  return (
    <div className='bg-bg-light dark:bg-bg-dark text-primary dark:text-primary-dark min-h-screen p-4 transition-all delay-250'>
        <div className="fixed h-screen w-screen">
            <InteractiveModel/>
            <div className="absolute left-0 bottom-0 -translate-y-1/2">
                <ul className='flex flex-col gap-3'>
                <li>
                    <Link
                        className="text-primary text-2xl relative"
                        to="https://www.instagram.com/ssimon_beatz/"
                        style={{ animation: 'glow 1.5s infinite' }}
                    >
                        <FiInstagram />
                    </Link>
                </li>
                <li>
                    <Link
                        className="text-primary text-2xl relative"
                        to="https://www.linkedin.com/in/mohamedaddar/"
                        style={{ animation: 'glow 1.5s infinite' }}
                    >
                        <FiLinkedin />
                    </Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="z-10 flex w-full h-screen">
            <div className="m-auto w-full h-screen flex">
                <p className='relative h-fit top-1/3 mx-auto text-2xl text-primary dark:text-primary-dark font-bold'>Hi, My name is Mohamed Addar.</p>
            </div>
        </div>
        <div className="flex w-full h-screen">
           <div className="w-1/2 h-full"></div>
           <div className="w-1/2 h-full flex flex-col">
                <div className="my-auto">
                    <p className='font-bold'>
                    Under Construction - Building My Portfolio <br />
                    <br />
                    Thank you for visiting! My portfolio is currently under construction as I work on showcasing my projects and skills. I'm excited to share my work with you soon.<br />
                    <br />
                    In the meantime, feel free to reach out to me at <Link className='z-20 relative underline hover:text-secondary hover:dark:text-secondary-dark transition-all ease-in-out delay-50' to="https://www.linkedin.com/in/mohamedaddar/">My linkedin</Link> for any inquiries or to learn more about my background and expertise. Stay tuned for updates and new additions to my portfolio.<br />
                    <br />
                    Thank you for your patience!<br />
                    <br />
                    Best regards,
                    <br />
                    <br />
                    Mohamed Addar
                    </p>
                </div>
           </div>
        </div>
    </div>
  )
}
