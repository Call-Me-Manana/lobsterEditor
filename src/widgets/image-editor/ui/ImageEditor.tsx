import { useEffect } from "react";
import { useRef } from "react";
interface Props {
    image: string | null;
    text: string;
}
export const ImageEditor = ({ image, text }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // создаём объект изображения
        const img = new Image();
        img.src = image;

        // рисуем, когда изображение загружено
        img.onload = () => {
            // подгоняем размер canvas под картинку
            canvas.width = img.width;
            canvas.height = img.height;

            // рисуем картинку на canvas
            ctx.drawImage(img, 0, 0);
            ctx.font = "48px Lobster";
            ctx.fillStyle = "white";
            ctx.fillText(text, 50, 100);
        };
    }, [image, text]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                maxWidth: "100%",
                border: "1px solid gray",
                borderRadius: "8px",
            }}
        />
    );
};
