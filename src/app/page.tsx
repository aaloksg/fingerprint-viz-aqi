import FingerprintControl from './FingerprintControl';
export default function Home() {
    return (
        <div className="w-dvw h-dvh bg-gray-800 flex justify-center items-center p-4">
            <div className="w-full h-full">
                <FingerprintControl />
            </div>
        </div>
    );
}
