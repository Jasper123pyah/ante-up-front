import React from "react";
import "./PreLogin.css";
import AliceCarousel from "react-alice-carousel";

function HowItWorks(){
    const responsive = {
        0: { items: 1  },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <div className={'howItWorksCard centered'}>
            Create/Join a lobby. (Placeholder for an image)
        </div>,
        <div className={'howItWorksCard centered'}>
            Play a match with your opponent. (Placeholder for an image)
        </div>,
        <div className={'howItWorksCard centered'}>
            Win the match and get money. (Placeholder for an image)
        </div>
    ]

    return<div style={{marginTop:'5vh', marginBottom:"6vh"}}>

        <div id={'hiw'} className={'title'}>How it works</div>
        <div style={{ display:'flex', justifyContent:'center'}}>
            <AliceCarousel
                paddingLeft={20}
                paddingRight={15}
                disableDotsControls={true}
                disableButtonsControls={window.innerWidth > 1000}
                infinite={false}
                items={items}
                keyboardNavigation={true}
                responsive={responsive}
                controlsStrategy="alternate"
            />
        </div>

    </div>
}
export default HowItWorks;