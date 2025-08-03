import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Downloads: React.FC = () => {
    const [downloads] = useState([]);

    const navigate = useNavigate();
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Downloads</h1>
                    <p className="text-muted-foreground">
                        Here you can manage your downloads.
                    </p>
                </div>
                <Button size="lg" onClick={() => {
                    navigate("/downloads/new");
                }}>
                    <Download className="mr-2 h-4 w-4" />
                    New Download
                </Button>
            </div>
            {downloads.length === 0 && (
                <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">
                        The downloads list is empty, start a new download to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Downloads;