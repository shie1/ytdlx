import { VideoMetadata } from "@/types";
import { Card } from "./ui/card";
import { useMemo } from "react";
import { Verified } from "lucide-react";

interface VideoInfoProps {
    videoMetadata: VideoMetadata;
}

const formatNumber = (number: number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
};

const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours === 0 && minutes === 0) {
        return `${seconds}s`;
    } else if (hours === 0) {
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
};

const formatFormat = (format: string) => {
    return format.split("x")[1].split(" ")[0]+"p";
};

const VideoInfo: React.FC<VideoInfoProps> = ({ videoMetadata }) => {
    const preferredThumbnail = useMemo(() => {
        return videoMetadata.thumbnails.reduce((prev, curr) => {
            return prev.preference > curr.preference ? prev : curr;
        });
    }, [videoMetadata]);
    return (
        <div className="p-0 overflow-hidden flex flex-col gap-4 w-full max-w-full bg-card rounded-md">
            <div className="flex flex-row gap-4">
                <img className="aspect-video object-cover w-48" src={preferredThumbnail.url} alt={videoMetadata.title} />
                <div className="flex flex-col gap-2 py-4 flex-1 min-w-0 w-full pr-4">
                    <h3 className="text-lg font-bold line-clamp-1">{videoMetadata.title}</h3>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-muted-foreground truncate">{videoMetadata.channel}</p>
                        {videoMetadata.channel_is_verified && <Verified className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                        <p className="text-sm text-muted-foreground truncate">{formatNumber(videoMetadata.channel_follower_count)} followers</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-muted-foreground truncate">{formatFormat(videoMetadata.format)}</p>
                        <p className="text-sm text-muted-foreground truncate">{videoMetadata.fps}fps</p>
                        <p className="text-sm text-muted-foreground truncate">{formatDuration(videoMetadata.duration)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoInfo;