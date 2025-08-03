import { Eye, Clock, ThumbsUp, MessageCircle } from "lucide-react";

interface VideoStatsProps {
    view_count: number;
    duration: number;
    like_count: number;
    comment_count: number;
}

const VideoStats: React.FC<VideoStatsProps> = ({ 
    view_count, 
    duration, 
    like_count, 
    comment_count 
}) => {
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(view_count)} views</span>
            </div>
            <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(duration)}</span>
            </div>
            <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{formatNumber(like_count)} likes</span>
            </div>
            <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{formatNumber(comment_count)} comments</span>
            </div>
        </div>
    );
};

export default VideoStats; 