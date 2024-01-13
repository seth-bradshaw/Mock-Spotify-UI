import React, { useEffect } from 'react'
import { useDispatch } from '../../store/hooks'
import { changeModal } from '../../store/slices/ui/ui';

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeModal('login'))
  }, [])

  return (
    <div className="bg-gradient-to-b from-spotify-gray-600 to-black h-screen w-full">
    </div>
  )
}
