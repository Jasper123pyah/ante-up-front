import React, {useState} from "react";
function Rankingbox(){

    const [recentWagers, setRecentWagers] = useState([
        {
            won:true,
            earning:35
        },
        {
            won:false,
            earning:200
        },
        {
            won:true,
            earning:35
        }
    ])

    return<div className={'rankingBox'}>
        <div className={'ranking'}>
            <div style={{marginBottom:'1vw'}} className={'rankingTitle'}>
                RANK
            </div>
            <div className={'rankingText'}>
                3333
            </div>
        </div>
        <div className={'verticalSeparator'}/>
        <div className={'ranking'}>
            <div style={{marginBottom:'1vw'}}  className={'rankingTitle'}>
                EARNINGS
            </div>
            <div className={'rankingText'}>
                $3333
            </div>
        </div>
        <div className={'verticalSeparator'}/>
        <div className={'ranking'}>
            <div style={{marginBottom:'0.5vw'}}  className={'rankingTitle'}>
                RECORD
            </div>
            <div className={'rankingText'}>
                173 W - 34 L
            </div>
            <div style={{fontSize:'large', marginTop:'0.5vw'}}>
                84% win rate
            </div>
        </div>
        <div className={'verticalSeparator'}/>
        <div className={'ranking'}>
            <div className={'rankingTitle'}>
                RECENT WAGERS
            </div>
            <div className={'rankingText'}>
                <div style={{display:'flex'}}>
                    {recentWagers.map(wager => <div className={'recentWager'}>
                            <div style={{fontSize:'x-large'}}>
                                {wager.won ? "W" : "L"}
                            </div>
                            <div style={{borderRadius:'50%', width:'25px', height:'25px', backgroundColor:wager.won ? 'green' : 'red'}}/>
                            <div style={{fontSize:'medium'}}>{wager.won ? "+$"+wager.earning : "-$"+wager.earning}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}
export default Rankingbox;