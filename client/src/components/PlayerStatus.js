import React from 'react'

const PlayerStatus = props =>
    <div className='player-status'>
        <p>{`Money: ${props.stats.money}`}</p>
        <p>{`Income: ${props.stats.income}`}</p>
        <p>{`Growth: ${props.stats.growth}`}</p>
        <p>{`Debt: ${props.stats.debt}`}</p>
        <p>{`Rent: ${props.stats.rent}`}</p>
        <p>{`Fervour: ${props.stats.fervour}`}</p>
        <p>{`Fatigue: ${props.stats.fatigue}`}</p>
    </div>

export default PlayerStatus
