import React from 'react'

export const LobbyPlayerName = (props: { playerName: string, nameNum: string }) => (
    <span className='playerName'>
        {props.playerName}<span className='playerNameNum'>{props.nameNum}</span>
    </span>
)
