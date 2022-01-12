import React from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
import RecommendedMobile from "./RecommendedMobile";

function RecommendedSlider(props) {

    const responsive = {
        0: { items: 1 },
    };
    /*
    const items = props.items.map((wager) => <div>
        <RecommendedBig/>
    </div>);
     */
    const items = [<RecommendedMobile/>,<RecommendedMobile/>,<RecommendedMobile/>,<RecommendedMobile/>];
    return (
        <div>
            <AliceCarousel
                disableDotsControls={true}
                infinite={true}
                items={items}
                keyboardNavigation={true}
                responsive={responsive}
                controlsStrategy="alternate"
            />
        </div>
    );
}
export default RecommendedSlider;