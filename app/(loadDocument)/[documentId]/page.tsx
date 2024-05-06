interface DocumentPageProps {
    params: {
        documentId: string,
    }
}

export default function DocumentPage({ params: { documentId } }: DocumentPageProps) {
    return (
        <div>{documentId}</div>
    );
}