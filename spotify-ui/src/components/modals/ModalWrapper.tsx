import React, { PropsWithChildren } from 'react'
import useToggleModal from './useToggleModal';

interface Props {
  title: string;
  dismissable?: boolean;
  className?: string;
}

export default function ModalWrapper({ children, title, className = '', dismissable }: PropsWithChildren<Props>) {
  const closeModal = useToggleModal();
  return (
    <div className="w-full h-screen z-40 bg-modalBlur block top-0 fixed">
      <div className="h-full w-full flex items-center justify-center">
        <div className={`w-full h-screen sm:w-96 sm:h-96 md:h-[480px] md:w-[480px] bg-black flex flex-col rounded-lg shadow ${className}`}>
            <div className="w-full shadow rounded-t-lg h-20 bg-black text-white font-bold flex items-center text-center justify-center">
              <h3 className="text-3xl w-full ml-6">{title}</h3>
              {
                dismissable && (
                    <button className="w-10 h-10 mr-5 hover:bg-spotify-gray-700 rounded-full p-2" onClick={() => closeModal()}>X</button>
                )
              }
            </div>
            {children}
        </div>
      </div>
    </div>
  )
}