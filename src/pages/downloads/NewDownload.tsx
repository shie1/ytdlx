import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoInfo from "@/components/VideoInfo";
import { VideoMetadata } from "@/types";
import { invoke } from "@tauri-apps/api/core";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useMemo, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface DownloadOptionsRef {
    getSelectedResolution: () => string;
    getDownloadOptions: () => {
        resolution: string;
        videoMetadata: VideoMetadata;
    };
}

const DownloadOptions = forwardRef<DownloadOptionsRef, { videoMetadata: VideoMetadata }>(({ videoMetadata }, ref) => {
    const availableResolutions = useMemo(() => {
        return videoMetadata.formats.filter((format) => format.height)
            .map((format) => format.format_note && format.format_note.includes("p") ? format.format_note : null)
            .filter((resolution) => resolution !== null)
            .filter((resolution, index, self) => self.indexOf(resolution) === index)
            .sort((a, b) => {
                const aHeight = parseInt(a.split("p")[0]);
                const bHeight = parseInt(b.split("p")[0]);
                return bHeight - aHeight;
            });
    }, [videoMetadata]);
    const [selectedResolution, setSelectedResolution] = useState<string>(availableResolutions[0]);
    const [includeVideo, setIncludeVideo] = useState(true);

    const [includeAudio, setIncludeAudio] = useState(true);

    useImperativeHandle(ref, () => ({
        getSelectedResolution: () => selectedResolution,
        getDownloadOptions: () => ({
            resolution: selectedResolution,
            videoMetadata
        })
    }), [selectedResolution, videoMetadata]);

    return (<>
        <div className="flex flex-col gap-2 bg-card p-4 rounded-md w-full">
            <div className="flex flex-row gap-2 items-center">
                <Switch checked={includeVideo} onCheckedChange={setIncludeVideo} />
                <h3 className="text-lg font-bold">Video</h3>
            </div>
            <div className={cn(
                "flex flex-col gap-0 transition-all duration-300 ease-in-out overflow-hidden",
                includeVideo
                    ? "max-h-32 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"
            )}>
                <p className="text-sm text-muted-foreground transition-opacity duration-200">Resolution</p>
                <Select value={selectedResolution} onValueChange={setSelectedResolution}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a resolution" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableResolutions.map((resolution) => (
                            <SelectItem key={resolution} value={resolution}>{resolution}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex flex-col gap-2 bg-card p-4 rounded-md w-full">
            <div className="flex flex-row gap-2 items-center">
                <Switch checked={includeAudio} onCheckedChange={setIncludeAudio} />
                <h3 className="text-lg font-bold">Audio</h3>
            </div>
        </div>
    </>
    );
});

const NewDownload: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const downloadOptionsRef = useRef<DownloadOptionsRef>(null);

    const handleDownload = () => {
        if (downloadOptionsRef.current) {
            const options = downloadOptionsRef.current.getDownloadOptions();
            console.log("Download options:", options);
        }
    };

    return (
        <div className="space-y-6 w-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">New Download</h1>
                    <p className="text-muted-foreground">
                        {videoMetadata ?
                            "Please specify the download options" :
                            "Enter the URL of the video you want to download."}
                    </p>
                </div>
            </div>
            {videoMetadata === null && (<>
                <Input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => navigate("/downloads")}>Back</Button>
                    <Button onClick={async () => {
                        setLoading(true);
                        console.log("Get metadata for video: " + videoUrl);
                        try {
                            const metadata = await invoke<string>("get_video_metadata", { videoUrl });
                            setVideoMetadata(JSON.parse(metadata) as VideoMetadata);
                        } catch (error) {
                            toast.error("Failed to parse video, please check the URL and try again.");
                            console.error(error);
                        } finally {
                            setLoading(false);
                            setVideoUrl("");
                        }
                    }}>
                        {loading ? <Loader2 className="animate-spin" /> : "Parse video"}
                    </Button>
                </div>
            </>
            )}
            {videoMetadata && (
                <>
                    <VideoInfo videoMetadata={videoMetadata} />
                    <DownloadOptions ref={downloadOptionsRef} videoMetadata={videoMetadata} />
                    <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setVideoMetadata(null)}>
                            <ArrowLeft className="w-4 h-4" />
                            Different video
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewDownload;