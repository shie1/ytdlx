import { Calendar, User } from "lucide-react";
import VideoStats from "./VideoStats";
import VideoDetails from "./VideoDetails";

interface VideoInfoProps {
    title: string;
    channel: string;
    channel_is_verified: boolean;
    channel_follower_count: number;
    view_count: number;
    duration: number;
    like_count: number;
    comment_count: number;
    upload_date: string;
    resolution: string;
    fps: number;
    vcodec: string;
    acodec: string;
    is_live: boolean;
}

const VideoInfo: React.FC<VideoInfoProps> = ({
    title,
    channel,
    channel_is_verified,
    channel_follower_count,
    view_count,
    duration,
    like_count,
    comment_count,
    upload_date,
    resolution,
    fps,
    vcodec,
    acodec,
    is_live
}) => {
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDate = (timestamp: string): string => {
        // Parse YYYYMMDD format from yt-dlp
        const year = parseInt(timestamp.substring(0, 4));
        const month = parseInt(timestamp.substring(4, 6)) - 1; // Month is 0-indexed
        const day = parseInt(timestamp.substring(6, 8));
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="p-6 space-y-4">
            {/* Title */}
            <div>
                <h2 className="text-xl font-bold text-foreground line-clamp-2">
                    {title}
                </h2>
            </div>

            {/* Channel Info */}
            <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">{channel}</span>
                {channel_is_verified && (
                    <span className="text-blue-500">✓</span>
                )}
                <span className="text-sm">• {formatNumber(channel_follower_count)} followers</span>
            </div>

            {/* Stats */}
            <VideoStats 
                view_count={view_count}
                duration={duration}
                like_count={like_count}
                comment_count={comment_count}
            />

            {/* Upload Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Uploaded {formatDate(upload_date)}</span>
            </div>

            {/* Video Details */}
            <VideoDetails 
                resolution={resolution}
                fps={fps}
                vcodec={vcodec}
                acodec={acodec}
            />

            {/* Live Status */}
            {is_live && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    LIVE
                </div>
            )}
        </div>
    );
};

export default VideoInfo; 