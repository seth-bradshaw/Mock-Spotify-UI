import React from 'react'

type Props = { 
    className: string; 
    label: string; 
    htmlFor?: string; 
}

export default function TimeLabel ({ className, label, htmlFor = '' }: Props) {
    return (
        <label htmlFor={htmlFor} className={`w-10 text-spotify-gray-200 font-medium ${className}`}>{label}</label>
    )
}