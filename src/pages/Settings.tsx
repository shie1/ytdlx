import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { open } from '@tauri-apps/plugin-dialog';
import { toast } from "sonner"

const Settings: React.FC = () => {
    const [downloadsDirectory, setDownloadsDirectory] = useState("");
    const [newDownloadsDirectory, setNewDownloadsDirectory] = useState("");

    const [downloadsMaxConcurrent, setDownloadsMaxConcurrent] = useState(0);
    const [newDownloadsMaxConcurrent, setNewDownloadsMaxConcurrent] = useState(0);

    useEffect(() => {
        invoke("get_downloads_directory").then((downloadsDirectory) => {
            setDownloadsDirectory(downloadsDirectory as string);
            setNewDownloadsDirectory(downloadsDirectory as string);
        });
        invoke("get_config_downloads_max_concurrent").then((downloadsMaxConcurrent) => {
            setDownloadsMaxConcurrent(downloadsMaxConcurrent as number);
            setNewDownloadsMaxConcurrent(downloadsMaxConcurrent as number);
        });
    }, []);

    const handleSave = useCallback(() => {
        if (newDownloadsDirectory !== downloadsDirectory) {
            invoke("set_downloads_directory", { downloadsDirectory: newDownloadsDirectory }).then(() => {
            });
        }
        if (newDownloadsMaxConcurrent !== downloadsMaxConcurrent) {
            invoke("set_config_downloads_max_concurrent", { maxConcurrent: newDownloadsMaxConcurrent }).then(() => {
            });
        }
        toast("Changes saved!");
    }, [
        newDownloadsDirectory, downloadsDirectory,
        newDownloadsMaxConcurrent, downloadsMaxConcurrent
    ]);

    return (
        <div className="space-y-6 flex-col gap-4 w-full min-h-full flex">
            <h1 className="text-3xl font-bold">Settings</h1>
            {/* folder select, downloads directory */}
            <div className="flex flex-col gap-4 w-full flex-1">
                <div className="flex flex-col gap-1 w-full">
                    <h2 className="text-lg font-bold">Downloads Directory</h2>
                    <p className="text-sm text-muted-foreground">
                        The directory where the downloads will be saved.
                    </p>
                    <div className="flex w-full items-center gap-2">
                        <Input
                            type="text"
                            placeholder="C:/Users/username/Downloads"
                            value={newDownloadsDirectory || downloadsDirectory}
                            onChange={(e) => setNewDownloadsDirectory(e.target.value)}
                        />
                        <Button variant="outline" size="icon" onClick={async () => {
                            const dir = await open({
                                directory: true,
                            });
                            if (dir) {
                                setNewDownloadsDirectory(dir);
                            }
                        }}>
                            <FolderOpen />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <h2 className="text-lg font-bold">Max Concurrent Downloads</h2>
                    <p className="text-sm text-muted-foreground">
                        The maximum number of downloads that can run at the same time. (0 = unlimited)
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                        Requires restart to take effect.
                    </p>
                    <Input
                        type="number"
                        placeholder="1"
                        min={0}
                        max={4294967295}
                        value={newDownloadsMaxConcurrent ?? downloadsMaxConcurrent}
                        onChange={(e) => setNewDownloadsMaxConcurrent(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-auto">
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}

export default Settings;