import React, { PropsWithChildren } from 'react'

type Props = {
  title?: string;
  link?: string;
  linkHref?: string;
}

export default function Section({ title = '', link = '', linkHref = '', children }: PropsWithChildren<Props>) {
  return (
    <div className="mb-10">
      {
        title || link && (

          <div className="w-full flex justify-between h-12 text-white">
            <h4 className="text-2xl hover:underline">{title}</h4>
            {
              link.length > 0 && (
                <a className="text-md no-underline hover:underline text-spotify-gray-300" href={linkHref}>{link}</a>
              )
            }
          </div>
        )
      }
      {children}
    </div>
  )
}