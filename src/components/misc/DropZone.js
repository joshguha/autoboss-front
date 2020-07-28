import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropZone({ imgSrc, setImgSrc }) {
    const imageMaxSize = 1000000;

    const onDrop = useCallback(
        (acceptedFiles) => {
            const acceptedFileTypes = [
                "image/x-png",
                "image/png",
                "image/jpg",
                "image/jpeg",
            ];

            const verifyFile = (files) => {
                if (files && files.length > 0) {
                    const currentFile = files[0];
                    const {
                        type: currentFileType,
                        size: currentFileSize,
                    } = currentFile;
                    if (!acceptedFileTypes.includes(currentFileType)) {
                        return alert(
                            "This file is not allowed. Only images are allowed."
                        );
                    }
                    if (currentFileSize > imageMaxSize) {
                        return alert(
                            `This file is not allowed. ${currentFileSize} bytes is too large.`
                        );
                    }
                    return true;
                }
            };

            if (acceptedFiles && acceptedFiles.length > 0) {
                const isVerified = verifyFile(acceptedFiles);
                if (isVerified) {
                    const currentFile = acceptedFiles[0];
                    const reader = new FileReader();
                    reader.addEventListener(
                        "load",
                        () => {
                            setImgSrc(reader.result);
                        },
                        false
                    );
                    reader.readAsDataURL(currentFile);
                }
            }
        },
        [setImgSrc]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps({ multiple: false })} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}
