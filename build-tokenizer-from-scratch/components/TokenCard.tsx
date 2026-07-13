interface Props {

    token: string;

}

export default function TokenCard({

    token

}: Props) {

    return (

        <div

            className="rounded-lg bg-orange-500 px-4 py-2 font-medium"

        >

            {token}

        </div>

    );

}