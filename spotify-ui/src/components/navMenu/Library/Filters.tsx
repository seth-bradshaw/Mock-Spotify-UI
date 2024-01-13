import React, { useState } from 'react'
import useLibraryContext from './context/useLibraryContext'

type Props = {
    opt: string | null
    applyFilter: (opt: string | null) => void
}

const FilterPill = ({ opt, applyFilter }: Props) => (
    <div onClick={() => applyFilter(opt)}className="p-2 text-lg bg-spotify-gray-700 rounded-full hover:bg-spotify-gray-650">
        { 
            opt ? (
                opt.slice(0,1).toUpperCase() + opt.slice(1)
            ) : (
                <div className="rounded-full h-6 w-6 flex items-center justify-center">
                    <i className="fa-solid fa-x fa-lg"></i>
                </div>
            )
        }
    </div>
)

export default function Filters() {
    const { applyFilter } = useLibraryContext();
    const options = ['playlists', 'albums', 'artists']
    const [filters, setFilters] = useState(options)

    const applyFilterOption = (opt: string | null) => {
        if (filters.length === 1 && filters.at(0) === opt || !opt) {
            setFilters(options)
        } else {
            setFilters([opt]);
        }
        applyFilter(opt);
    }

    return (
        <div className="w-full flex gap-2 p-2 text-white">
            {
                filters.length === 1 && (
                    <FilterPill opt={null} applyFilter={applyFilterOption} />
                )
            }
            {
                filters.map((opt) => {
                    return (
                        <FilterPill opt={opt} applyFilter={applyFilterOption} />
                    )
                })
            }
        </div>
    )
}