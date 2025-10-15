import { useState } from "react";
import { ImageUploader } from "@features/upload-image/ui/ImageUploader";
import { ImageEditor } from "@widgets/image-editor/ui/ImageEditor";
import { EditOutlined, DownloadOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { TextControls } from "@features/add-text/ui/TextControls";
export const EditorPage = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [showTextControls, setShowTextControls] = useState(false);
    const handleImageSelect = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => setImageSrc(e.target?.result as string);
        reader.readAsDataURL(file);
    };
    const downloadImage = () => {
        const canvas = document.querySelector<HTMLCanvasElement>("canvas");
        if (!canvas) return;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "image.png";
        link.click();
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-400 p-8">
            <div className="w-full max-w-lg mb-6">
                <ImageUploader onImageSelect={handleImageSelect} />
            </div>
            {imageSrc && (
                <Card
                    className="w-full max-w-3xl rounded-xl shadow-md"
                    actions={[
                        <div
                            key="edit"
                            onClick={() =>
                                setShowTextControls(!showTextControls)
                            }
                            className="p-2 rounded-md cursor-pointer transition"
                        >
                            <EditOutlined className="text-xl" />
                        </div>,
                        <div
                            key="download"
                            onClick={downloadImage}
                            className="p-2 rounded-md cursor-pointer transition"
                        >
                            <DownloadOutlined className="text-xl" />
                        </div>,
                    ]}
                >
                    <>
                        {showTextControls && (
                            <div className="mb-4">
                                <TextControls value={text} onChange={setText} />
                            </div>
                        )}
                        <ImageEditor image={imageSrc} text={text} />
                    </>
                </Card>
            )}
        </div>
    );
};
