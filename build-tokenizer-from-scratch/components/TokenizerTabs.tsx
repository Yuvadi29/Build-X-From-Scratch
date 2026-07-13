const tabs = [

    "Word",

    "Character",

    "BPE",

    "GPT"

];

interface Props {

    selected: string;

    onChange: (tab: string) => void;

}

export default function TokenizerTabs({

    selected,

    onChange

}: Props) {

    return (

        <div className="flex flex-wrap gap-3">

            {

                tabs.map(tab => (

                    <button

                        key={tab}

                        onClick={() => onChange(tab)}

                        className={`

                        rounded-lg

                        px-5

                        py-2

                        transition

                        ${selected === tab

                                ? "bg-orange-500"

                                : "bg-zinc-800 hover:bg-zinc-700"

                            }

                        `}

                    >

                        {tab}

                    </button>

                ))

            }

        </div>

    );

}