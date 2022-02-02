import {app} from "./FirebaseApp";
import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {useState} from "react";


const storage = getStorage(app);

export function GetImage(folder, imageName) {
    const imageRef = ref(storage, '/' + folder +  '/' + imageName);
    const [responseURL, setResponseURL] = useState("");

    getDownloadURL(imageRef).then(url => {
        setResponseURL(url)
    }).catch(err => console.log(err));

    return responseURL;
}
export function UploadImage(folder, file) {
    const storageRef = ref(storage, '/' + folder + '/' + file.name)
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
    });
}
