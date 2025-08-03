interface VideoDetailsProps {
    resolution: string;
    fps: number;
    vcodec: string;
    acodec: string;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ 
    resolution, 
    fps, 
    vcodec, 
    acodec 
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <span className="text-muted-foreground">Resolution:</span>
                <span className="ml-2 font-medium">{resolution}</span>
            </div>
            <div>
                <span className="text-muted-foreground">FPS:</span>
                <span className="ml-2 font-medium">{fps}</span>
            </div>
            <div>
                <span className="text-muted-foreground">Video Codec:</span>
                <span className="ml-2 font-medium">{vcodec}</span>
            </div>
            <div>
                <span className="text-muted-foreground">Audio Codec:</span>
                <span className="ml-2 font-medium">{acodec}</span>
            </div>
        </div>
    );
};

export default VideoDetails; 