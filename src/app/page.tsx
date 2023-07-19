import Link from 'next/link';

export default function Home() {
    return (
        <nav>
            <h1 className="text-6xl">Homepage</h1>
            <Link href="/about">About</Link>
        </nav>
    );
}
