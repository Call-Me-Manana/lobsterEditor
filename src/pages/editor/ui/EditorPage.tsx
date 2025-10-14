import { useState } from "react";
import { ImageUploader } from "../../../features/upload-image/ui/ImageUploader";
import { ImageEditor } from "../../../widgets/image-editor/ui/ImageEditor";

export const EditorPage = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };
    return (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
            <ImageUploader onImageSelect={handleImageSelect} />
            {imageSrc && (
                <>
                    <ImageEditor image={imageSrc} />
                </>
            )}
        </div>
    );
};
