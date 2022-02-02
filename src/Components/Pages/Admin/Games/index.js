import React, {useEffect, useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import AdminGameCard from "./AdminGameCard";
import CenteredLoader from "../../../Shared/CenteredLoader";
import AddGame from "./AddGame";
import EditGame from "./EditGame";

function AdminGames(props) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editGame, setEditGame] = useState(null);
    useEffect(() => {
        getAllGames();
    }, [props.api]);

    function getAllGames() {
        if (props.api !== undefined) {
            setLoading(true)
            props.api.get('/Game').then(res => {
                setGames(res.data);
                setLoading(false)
            })
        }
    }
    function OpenEdit(game){
        setEditGame(game);
    }
    return <div>
        {loading ? <CenteredLoader/> : <div style={{marginTop: '1vw'}}>
            <div>
                <div style={{display:'inline-block', width:'50%',padding:'10px'}}>
                    <AddGame/>
                </div>
                <div style={{display:'inline-block', width:'50%', padding:'10px'}}>
                   {editGame ? <EditGame game={editGame}/> : ''}
                </div>
            </div>
            <Row sm={1} md={2} lg={5}>
                {games.map((Game) => (
                    <Col sm={12}>
                        <AdminGameCard setEdit={OpenEdit} game={Game} key={Game.id}/>
                    </Col>
                ))}
            </Row>
        </div>}
    </div>
}

const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(AdminGames);