import React, {useEffect, useState} from "react";

function GameStatsCard(props){
    const[winrate, setWinrate] = useState(0);

    useEffect(() => {
        if(props.stats !== undefined){
            let winRate = Math.round((props.stats.wins+props.stats.losses)/props.stats.wins);
            setWinrate(winRate)
        }

    },[props]);
    return <div className={'gameStatsCard'}>
        <div className={'gameStatsTitle'}>
            {props.stat.gameName.toUpperCase()}
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Record
            </div>
            <div className={'gameStatsTextRight'}>
                {props.stat.wins}/{props.stat.losses}
            </div>
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Win Rate
            </div>
            <div className={'gameStatsTextRight'}>
                {winrate}%
            </div>
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Earnings
            </div>
            <div className={'gameStatsTextRight'}>
                ${props.stat.earnings}
            </div>
        </div>
        <div className={'horizontalSeparator'} />
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Elo
            </div>
            <div style={{border:'1px solid #00ff1a', borderRadius:'10px', padding:'2px'}} className={'gameStatsTextRight'}>
                {props.stat.elo}
            </div>
        </div>
    </div>

}

export default GameStatsCard;