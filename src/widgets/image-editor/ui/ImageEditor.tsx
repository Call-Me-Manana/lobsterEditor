import { useEffect } from "react";
import { useRef } from "react";
interface ImageEditorProps {
    image: string | null;
}
export const ImageEditor = ({ image }: ImageEditorProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [image]);

    return (
        <canvas
            ref={canvasRef}
            className="max-w-full border border-gray-400 rounded-lg"
        />
    );
};
