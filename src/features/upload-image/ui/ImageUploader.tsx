import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
}

export const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
    const validateImage = async (file: File): Promise<boolean> => {
        const buffer = await file.slice(0, 4).arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const signature = Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        const validSignatures = [
            "89504e47", // PNG
            "ffd8ffe0", // JPG
            "ffd8ffe1", // JPG
            "ffd8ffe2", // JPG
            "47494638", // GIF
        ];

        return validSignatures.includes(signature);
    };
    const onDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            if (!(await validateImage(acceptedFiles[0]))) {
                alert("Файл не является изображением!");
                return;
            }
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
