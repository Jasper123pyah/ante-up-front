import {DefaultButton, IconButton, mergeStyleSets, Modal, PrimaryButton, TextField} from "@fluentui/react";
import {useState} from "react";
import {getAPI} from "../../../../Core/Global/global.selectors";
import {connect} from "react-redux";

function DeleteModal(props) {

    const gameName = props.game.name;
    const [nameConfirm, setNameConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function changeShowModal() {
        props.setShowModal();
    }

    function ChangeText(e, text) {
        setNameConfirm(text);
    }

    function Delete() {
        if (nameConfirm === gameName) {
            if (props.api !== undefined) {
                const id = props.game.id;
                props.api.delete("/admin/game/" + id).then(res => {
                    changeShowModal();
                }).catch((err) => console.log(err))
            }
        } else {
            setErrorMessage("Type \"" + gameName + "\" to confirm.")
        }
    }

    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
            width: '30vw',
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
                onDismiss={changeShowModal}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                <div>
                    <IconButton
                        iconProps={{iconName: "Cancel"}}
                        onClick={changeShowModal}
                    />
                </div>
                <div style={{margin: '10px', display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '10px'}}>
                    <div style={{fontSize: "large"}}>
                        Type "{gameName}" to delete this game.
                    </div>
                    <TextField errorMessage={errorMessage} onChange={ChangeText}/>
                    <DefaultButton onClick={Delete} text={"Delete"}/>
                </div>
            </Modal>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        api: getAPI(state)
    };
};

export default connect(mapStateToProps)(DeleteModal);
