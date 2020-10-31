import React from 'react'

const PlayerStatus = props =>
    <div className='player-status'>
        <div className='player-status-stat'>
            <p>{`Money: ${props.stats.money}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Money</p>
                <p className='addedTextText'>How much Money you have to spend on playing cards.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Income: ${props.stats.income}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Income</p>
                <p className='addedTextText'>The amount your Money will refill to at the end of your turn.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Growth: ${props.stats.growth}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Growth</p>
                <p className='addedTextText'>The amount your Income will increase by at the end of your turn.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Debt: ${props.stats.debt}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Debt</p>
                <p className='addedTextText'>How much Debt will be subtracted from your Money next turn.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Rent: ${props.stats.rent}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Rent</p>
                <p className='addedTextText'>How much Money you will spend on your cards with Rent at the end of your turn.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Fervour: ${props.stats.fervour}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Fervour</p>
                <p className='addedTextText'>Your total amount of Fervour, which increases the power of some cards.</p>
            </div>
        </div>
        <div className='player-status-stat'>
            <p>{`Fatigue: ${props.stats.fatigue}`}</p>
            <div className='addedText'>
                <p className='addedTextName'>Debt</p>
                <p className='addedTextText'>How much damage you will take next time you try to draw a card that isn't there, or spend money you don't have.</p>
            </div>
        </div>
        {/* <p>{`Income: ${props.stats.income}`}</p>
        <p>{`Growth: ${props.stats.growth}`}</p>
        <p>{`Debt: ${props.stats.debt}`}</p>
        <p>{`Rent: ${props.stats.rent}`}</p>
        <p>{`Fervour: ${props.stats.fervour}`}</p>
        <p>{`Fatigue: ${props.stats.fatigue}`}</p> */}
    </div>

export default PlayerStatus
