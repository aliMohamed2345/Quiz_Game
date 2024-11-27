interface LoadingProps {
    Width?: string;
    Height?: string;
}

function Loading({ Width = "2.5rem", Height = Width }: LoadingProps) {
    return (
        <div
            className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <div
                className="border-4 border-solid border-t-transparent border-red-600 rounded-full animate-spin"
                style={{ width: Width, height: Height }}
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
