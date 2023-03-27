import { Outlet } from 'react-router'
import StickyHeader from './views/ViewLayout/StickyHeader'

type Props = {}

export default function View(props: Props) {
  return (
    <div className='row-span-1 overflow-y-auto relative bg-spotify-gray-900'>
      <StickyHeader />
      <Outlet />
    </div>
  )
}