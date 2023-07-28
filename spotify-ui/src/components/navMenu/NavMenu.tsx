import { PropsWithChildren, useState } from 'react'
import Resize from './Resize'
import { Link } from 'react-router-dom'
import Library from './Library/Library'
import LibraryContextProvider from './Library/context/LibraryContext'

type Props = {}

type LinkProps = {
  label: string;
  href: string;
  expanded: boolean;
}

const MainLink = ({ label, children, href, expanded }: PropsWithChildren<LinkProps>) => {
  return (
    <Link to={href} className="hover:text-white flex gap-4 items-center delay-100 ease-in-out">
      <div className="w-5 h-5 flex justify-center items-center">
        {children}
      </div>
      {
        expanded && (
          <p>{label}</p>
        )
      }
    </Link>
  )
}

export default function Menu({}: Props) {
  const [expanded, setExpanded] = useState(true);

  const toggleMenu = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={`col-span-1 flex flex-col relative bg-black gap-3 p-4 text-spotify-gray-300 overflow-hidden ${!expanded ? 'justify-center items-center p-2' : ''}`}>
      <div className={`w-full text-xl flex flex-col justify-center gap-4 mb-4 bg-spotify-gray-800 rounded-lg p-4 h-32 ${!expanded ? 'items-center' : ''}`}>
        <MainLink href="" label="Home" expanded={expanded}>
          <i className="fa-solid fa-house fa-lg"></i> 
        </MainLink>
        <MainLink href="search" label="Search" expanded={expanded}>
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </MainLink>
      </div>
      <LibraryContextProvider>
        <Library expanded={expanded} toggleMenu={toggleMenu} />
      </LibraryContextProvider>
      <Resize expanded={expanded} toggleMenu={toggleMenu} />
    </div>
  )
}