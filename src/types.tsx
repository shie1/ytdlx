export type Format = {
    format_id: string;
    format_note: string;
    ext: string;
    protocol: string;
    acodec: string;
    vcodec: string;
    url: string;
    width: number;
    height: number;
    fps: number;
    rows?: number;
    columns?: number;
    filesize?: number;
    quality?: number;
    resolution?: string;
    [key: string]: unknown;
}

export type Thumbnail = {
    url: string;
    preference: number;
    id: number;
    height?: number;
    width?: number;
    resolution?: string;
}

export type VideoMetadata = {
    id: string;
    title: string;
    formats: Format[];
    thumbnails: Thumbnail[];
    thumbnail: string;
    description: string;
    channel_id: string;
    channel_url: string;
    duration: number;
    view_count: number;
    webpage_url: string;
    live_status: string;
    comment_count: number;
    like_count: number;
    channel: string;
    channel_follower_count: number;
    channel_is_verified: boolean;
    uploader: string;
    uploader_id: string;
    uploader_url: string;
    upload_date: string;
    timestamp: number;
    availability: string;
    original_url: string;
    duration_string: string;
    fulltitle: string;
    display_id: string;
    is_live: boolean;
    was_live: boolean;
    format: string;
    language: string;
    format_note: string;
    filesize_approx: number;
    tbr: number;
    width: number;
    height: number;
    resolution: string;
    fps: number;
    vcodec: string;
    vbr: number;
    aspect_ratio: number;
    acodec: string;
    filename: string;
}