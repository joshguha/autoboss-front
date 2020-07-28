import React, { useState, useCallback } from "react";
import Slider from "@material-ui/lab/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./styles.css";

export default function ImageUploadCrop({
    imgSrc,
    croppedImage,
    setCroppedImage,
}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imgSrc,
                croppedAreaPixels,
                rotation
            );
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imgSrc, setCroppedImage, croppedAreaPixels, rotation]);

    return (
        <div className="App">
            <div className="crop-container">
                <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="controls">
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    classes={{ container: "slider" }}
                />
                <button onClick={showCroppedImage}>Crop</button>
            </div>
            <button onClick={showCroppedImage}>Show Result</button>
        </div>
    );
}
