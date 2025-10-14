import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
    onImageSelect: (file: File) => void;
}

export const ImageUploader = ({ onImageSelect }: Props) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            console.log("Файл выбран:", acceptedFiles);
            if (acceptedFiles.length > 0) {
                onImageSelect(acceptedFiles[0]);
            }
        },
        [onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: "2px dashed #888",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "12px",
            }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Отпустите файл сюда...</p>
            ) : (
                <p>
                    Перетащите изображение сюда или кликните, чтобы выбрать файл
                </p>
            )}
        </div>
    );
};
