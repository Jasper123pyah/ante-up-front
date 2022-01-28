import {DefaultButton, mergeStyleSets, Modal, PrimaryButton} from "@fluentui/react";
import {useHistory} from "react-router-dom";

function InWagerModal(props) {
    const history = useHistory();
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'center',
            width: '38vw',
            '@media(max-width: 600px)': {
                width: '98vw',
            },
            '@media(max-width: 950px)': {
                width: '88vw'
            }
        },

    });
    function postWager(){
        props.postWager();
    }
    return (
        <div>
            <Modal
                isOpen={props.show}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div style={{padding: "2vw", textAlign: 'center', fontSize: 'large'}}>
                    You are currently already in a wager. If you want to create a new wager, you will have to leave your
                    current one. Would you like to leave it?
                    <div style={{display:'flex', gap:'20px', padding:'1vh', justifyContent:'center'}}>
                        <PrimaryButton onClick={postWager} text={"Yes"}/>
                        <DefaultButton onClick={() => history.push("/")} text={"No"}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default (InWagerModal);