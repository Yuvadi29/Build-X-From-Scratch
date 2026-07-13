interface Props {
    value: string;
    onChange: (text: string) => void;
}

export default function TokenInput({
    value,
    onChange
}: Props) {

    return (

        <textarea

            rows={6}

            value={value}

            onChange={(e) =>
                onChange(e.target.value)
            }

            placeholder="Enter text..."

            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 outline-none"

        />

    );

}