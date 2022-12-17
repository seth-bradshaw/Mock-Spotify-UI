import React, { useState } from 'react'

type Props = {
    volume: number;
}


export default function VolumeIcon({ volume }: Props) {
    if (volume > 75) {
       return <i className="fa-solid fa-volume-high"></i>;
    } else if (volume > 0) {
        return <i className="fa-solid fa-volume-low"></i>;
    } else {
        return <i className="fa-solid fa-volume-off"></i>;
    }
}