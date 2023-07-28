import React from 'react'
import { Link } from 'react-router-dom'

type LibraryItem = any

type Props = {
    item: LibraryItem
    expanded: boolean
}

export default function LibraryItem({ item, expanded }: Props) {
    return (
        <Link
            to={item.href}
            className={`w-full hover:bg-spotify-gray-600 flex gap-2 ${expanded ? 'p-2' : 'w-14 h-14'} rounded-lg`}
        >
            <img className="h-14 w-14 rounded-lg" src={item.imageUrl}>
            </img>
            { 
                expanded && (
                    <div className="text-lg text-white w-full overflow-hidden flex flex-col justify-between h-14">
                        <p className="truncate">{item.name}</p>
                        <p className="text-sm truncate">{item.description}</p>
                    </div>
                )
            }
        </Link>
    )
}