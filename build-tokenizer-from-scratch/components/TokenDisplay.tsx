import TokenCard from "./TokenCard";

interface Props {

    tokens: string[];

}

export default function TokenDisplay({

    tokens

}: Props) {

    return (

        <div>

            <h2 className="mb-4 text-2xl font-semibold">

                Tokens

            </h2>

            <div className="flex flex-wrap gap-3">

                {

                    tokens.length === 0

                        ?

                        <p className="text-zinc-500">

                            No Tokens Yet

                        </p>

                        :

                        tokens.map((token, index) => (

                            <TokenCard

                                key={index}

                                token={token}

                            />

                        ))

                }

            </div>

        </div>

    );

}