interface Props {

    text: string;

    tokens: string[];

}

export default function TokenStats({

    text,

    tokens

}: Props) {

    return (

        <div

            className="rounded-xl border border-zinc-800 p-6"

        >

            <h2

                className="mb-6 text-xl font-semibold"

            >

                Statistics

            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>

                        Characters

                    </span>

                    <span>

                        {text.length}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Tokens

                    </span>

                    <span>

                        {tokens.length}

                    </span>

                </div>

            </div>

        </div>

    );

}