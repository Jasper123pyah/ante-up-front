import {IconButton, mergeStyleSets, Modal} from "@fluentui/react";
import GamerTag from "./index";

function GamerTagModal(props) {

    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            width: '40vw',
            '@media(max-width: 600px)': {
                width: '100vw',
            },
            '@media(max-width: 950px)': {
                width: '90vw'
            }
        },

    });
    return (
        <div>
            <Modal
                isOpen={props.show}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div>
                    <GamerTag gameName={props.gameName}setModal={props.setShowModal}/>
                </div>
            </Modal>
        </div>
    );
};


export default (GamerTagModal);