import React, { PropsWithChildren } from 'react'

type Props = {
    className?: string
}

export default function GridWrapper({ className = '', children }: PropsWithChildren<Props>) {
    return (
        <div className={`grid grid-cols-[repeat(auto-fit,minmax(200px,max-content))] gap-6 justify-center w-full ${className}`}>
            {children}
        </div>
    )
}