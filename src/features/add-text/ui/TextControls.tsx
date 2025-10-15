import { Input } from "antd";
interface TextControlsProps {
    value: string;
    onChange: (text: string) => void;
}
export const TextControls = ({ value, onChange }: TextControlsProps) => {
    return (
        <div>
            <Input
                type="text"
                placeholder="Введите текст"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
