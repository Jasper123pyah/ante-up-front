import * as React from 'react';
import { List,TextField } from '@fluentui/react';

const onRenderCell = (item) => {
    return <div style={{marginLeft:"5px"}}>
            <div>
            {item.sender}: {item.message}
        </div>
    </div>
}

function ChatBox(){
    const items =[
        {
            sender: "jasper",
            message: "Hallo1"
        },{
            sender: "jasper",
            message: "Hallo2"
        },{
            sender: "jasper",
            message: "Hallo3"
        },{
            sender: "jasper",
            message: "Hallo4"
        },{
            sender: "jasper",
            message: "Hallowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo"
        },{
            sender: "jasper",
            message: "Hallo234"
        },
    ];

    return <div style={{width:"35%"}}>
            <div className={"chatBox"}>
                <List
                    items={items}
                    onRenderCell={onRenderCell}
                />
            </div>
            <TextField placeholder={"Send Message..."}/>
    </div>
};

export default ChatBox;
