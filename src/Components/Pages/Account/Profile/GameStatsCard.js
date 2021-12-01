import React from "react";

function GameStatsCard(props){

    return <div className={'gameStatsCard'}>
        <div className={'gameStatsTitle'}>
            {props.stat.gameName.toUpperCase()}
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Record
            </div>
            <div className={'gameStatsTextRight'}>
                124/56
            </div>
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Win Rate
            </div>
            <div className={'gameStatsTextRight'}>
                70%
            </div>
        </div>
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Earnings
            </div>
            <div className={'gameStatsTextRight'}>
                $124
            </div>
        </div>
        <div className={'horizontalSeparator'} />
        <div className={'gameStatsTextLine'}>
            <div className={'gameStatsTextLeft'}>
                Skill
            </div>
            <div className={'gameStatsTextRight'}>
                Champion
            </div>
        </div>
    </div>

}

export default GameStatsCard;