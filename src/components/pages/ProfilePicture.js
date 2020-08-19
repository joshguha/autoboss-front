import React, { useState } from "react";
import Axios from "axios";
import Sidebar from "../layout/Sidebar";
import Dropzone from "../misc/DropZone";
import ImageUploadCrop from "../misc/ImageUploadCrop";

export default function ProfilePicture() {
    const [imgSrc, setImgSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const reset = () => {
        setImgSrc(null);
        setCroppedImage(null);
    };

    const upload = async () => {
        try {
            const response = await fetch(croppedImage);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const blob = await response.blob();
                const file = new File([blob], "File name", {
                    type: "image/png",
                });

                console.log(file);
                const formData = new FormData();
                formData.append("myFile", file, file.name);
                console.log(formData);
                Axios.post("my-domain.com/file-upload", formData);
            }
            // if (croppedImage) {
            //     const response = await fetch(croppedImage);
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! Status: ${response.status}`);
            //     } else {
            //         const blob = await response.blob();
            //         const file = new File([blob], "File name", {
            //             type: "image/png",
            //         });
            //         const uploadConfig = await Axios.get(
            //             "https://autoboss-back.herokuapp.com/users/avatar/upload",
            //             {
            //                 headers: { "x-auth-token": userData.token },
            //             }
            //         );
            //         console.log(uploadConfig.data.url);
            //         console.log(file);
            //         const res = await Axios.put(uploadConfig.data.url, file, {
            //             headers: { "Content-Type": file.type },
            //         });
            //     }
            // // } else {
            //     throw new Error(`Cropped image not found.`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <Sidebar />
            {!imgSrc && <Dropzone imgSrc={imgSrc} setImgSrc={setImgSrc} />}
            {imgSrc && !croppedImage && (
                <ImageUploadCrop
                    imgSrc={imgSrc}
                    setCroppedImage={setCroppedImage}
                />
            )}
            {imgSrc && croppedImage && (
                <>
                    <img src={croppedImage} alt="cropped" />{" "}
                    <button onClick={upload}>Upload</button>
                    <button onClick={reset}>Try again</button>
                </>
            )}
        </div>
    );
}
