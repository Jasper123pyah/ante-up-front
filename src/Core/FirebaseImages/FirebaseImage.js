import {app} from "./FirebaseApp";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {useState} from "react";


const storage = getStorage(app);

export function GetCardImage(imageName) {
    const imageRef = ref(storage, '/CardImages/' + imageName);
    const [responseURL, setResponseURL] = useState("");

    getDownloadURL(imageRef).then(url => {
        setResponseURL(url)
    }).catch(err => console.log(err));

    return responseURL;
}
export function GetBannerImage(imageName) {
    const imageRef = ref(storage, '/BannerImages/' + imageName);
    const [responseURL, setResponseURL] = useState("");

    getDownloadURL(imageRef).then(url => {
        setResponseURL(url)
    }).catch(err => console.log(err));

    return responseURL;
}

export function UploadImage(file) {
    const storageRef = ref(storage, '/')
}