import React from 'react'

type Props = { 
    className: string; 
    label: string;
}

export default function TimeLabel ({ className, label }: Props) {
    return (
        <label className={`min-w-[40px] text-spotify-gray-200 font-medium ${className}`}>{label}</label>
    )
}