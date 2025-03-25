import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";

export const Fingerprint = () => {
    const [fingerprint, setFingerprint] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchFingerprint = async () => {
        try {
            const fp = await getFingerprint();
            setFingerprint(fp);
        } catch (error) {
            console.error("Error fetching fingerprint:", error);
        }
        };
    
        fetchFingerprint();
    }, []);
    
    return (
        <div>
        {fingerprint ? <p>{fingerprint}</p> : <p>Loading...</p>}
        </div>
    );
    }

    export default Fingerprint;