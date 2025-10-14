import { useDropzone } from "react-dropzone";

interface Props {
    onImageSelect: (file: File) => void;
}

export const ImageUploader = ({ onImageSelect }: Props) => {
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onImageSelect(acceptedFiles[0]);
        }
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer rounded-lg"
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
