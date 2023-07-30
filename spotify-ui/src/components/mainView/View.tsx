import { Outlet } from 'react-router'
import StickyHeader from './views/ViewLayout/StickyHeader'
import SearchContextProvider from './views/Search/SearchContext'

type Props = {}

export default function View(props: Props) {
  return (
    <SearchContextProvider>
    <div className='row-span-1 overflow-y-auto relative bg-gradient-to-b from-spotify-gray-700 to-black'>
      <StickyHeader />
      <Outlet />
    </div>
    </SearchContextProvider>
  )
}