interface HeaderProps {
    title: string;
    subtitle: string;
}

export default function Header({
    title,
    subtitle
}: HeaderProps) {

    return (
        <header className="mb-10">

            <h1 className="text-5xl font-bold">
                {title}
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400">
                {subtitle}
            </p>

        </header>
    );
}