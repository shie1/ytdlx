import { Thumbnail } from "@/types";

interface VideoThumbnailProps {
    thumbnails: Thumbnail[];
    title: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ thumbnails, title }) => {
    const thumbnail = thumbnails.sort((a, b) => b.preference - a.preference)[0].url;

    return (
        <div className="w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-t-lg">
            <img
                src={thumbnail} 
                alt={title}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default VideoThumbnail; 