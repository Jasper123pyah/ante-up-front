import React from "react";
import GameCard from "./GameCard";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
function CardSlider(props) {

    const responsive = {
        0: { items: 2 },
        568: { items: 3 },
        1024: { items: 5 },
    };

    const items = props.items.map((Game) => <div>
            <GameCard key={Game.id} img={Game.image} name={Game.name} wagers={Game.wagers}/>
        </div>);

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

export default CardSlider;