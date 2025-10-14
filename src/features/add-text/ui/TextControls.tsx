interface Props {
    value: string;
    onChange: (text: string) => void;
}
export const TextControls = ({ value, onChange }: Props) => {
    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
