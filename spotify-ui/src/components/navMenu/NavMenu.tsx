import React, { PropsWithChildren, ReactElement } from 'react'
import Resize from './Resize'
import { Link } from 'react-router-dom'
import PlaylistSection from './PlaylistSection'

type Props = {}

type LinkProps = {
  label: string;
  href: string;
}

const MainLink = ({ label, children, href }: PropsWithChildren<LinkProps>) => {
  return (
    <Link to={href} className="hover:text-white flex gap-2 items-center delay-100 ease-in-out">
      <div className="w-5 flex justify-center">
        {children}
      </div>
      <p>{label}</p>
    </Link>
  )
}

export default function Menu({}: Props) {
  return (
    <div className="col-span-1 flex flex-col relative bg-black gap-3 p-4 text-spotify-gray-300">
      <div className="text-white flex items-center gap-2 mb-4">
        <i className="fa-brands fa-spotify fa-2xl"></i>
        <h2 className="text-2xl">Spotify</h2>
      </div>
      <div className="w-full text-lg flex flex-col gap-2 mb-4">
        <MainLink href="" label="Home">
          <i className="fa-solid fa-house"></i> 
        </MainLink>
        <MainLink href="search" label="Search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </MainLink>
        <MainLink href="library" label="Library">
          <i className="fa-solid fa-bookmark"></i>
        </MainLink>
      </div>
      <hr className="border-spotify-gray-300"></hr>
      <PlaylistSection />
      <Resize />
    </div>
  )
}