import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { VideoMetadata } from "@/types";
import { invoke } from "@tauri-apps/api/core";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import VideoThumbnail from "@/components/VideoThumbnail";
import VideoInfo from "@/components/VideoInfo";

const NewDownload: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
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
                        }
                    }}>
                        {loading ? <Loader2 className="animate-spin" /> : "Parse video"}
                    </Button>
                </div>
            </>
            )}
            {videoMetadata && (
                <div className="space-y-4 overflow-y-auto">
                    <Card className="overflow-hidden py-0">
                        {/* Thumbnail on top */}
                        <VideoThumbnail 
                            thumbnails={videoMetadata.thumbnails}
                            title={videoMetadata.title}
                        />
                        
                        {/* Video Info */}
                        <VideoInfo 
                            title={videoMetadata.title}
                            channel={videoMetadata.channel}
                            channel_is_verified={videoMetadata.channel_is_verified}
                            channel_follower_count={videoMetadata.channel_follower_count}
                            view_count={videoMetadata.view_count}
                            duration={videoMetadata.duration}
                            like_count={videoMetadata.like_count}
                            comment_count={videoMetadata.comment_count}
                            upload_date={videoMetadata.upload_date}
                            resolution={videoMetadata.resolution}
                            fps={videoMetadata.fps}
                            vcodec={videoMetadata.vcodec}
                            acodec={videoMetadata.acodec}
                            is_live={videoMetadata.is_live}
                        />
                    </Card>
                </div>
            )}
        </div>
    );
};

export default NewDownload;