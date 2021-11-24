import {IconButton, mergeStyleSets, Modal} from "@fluentui/react";
import CreateLobby from "./CreateLobby";

function WagerModal(props){
    function changeShowModal(){
        props.setShowModal();
    }
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            width:'40vw',
            '@media(max-width: 600px)': {
                width: '100vw',
            },
            '@media(max-width: 950px)':{
                width:'80vw'
            }
        },

    });
    return (
        <div>
            <Modal
                isOpen={props.show}
                onDismiss={changeShowModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div>
                    <IconButton
                        iconProps={{iconName:"Cancel"}}
                        onClick={changeShowModal}
                    />
                </div>
                <div>
                    <CreateLobby/>
                </div>
            </Modal>
        </div>
    );
};


export default (WagerModal);