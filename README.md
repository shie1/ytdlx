# YTDLX - YouTube Downloader

A modern Windows 11 style YouTube video downloader built with Tauri, React, and TypeScript.

## Features

- 🎥 **Video Metadata Fetching**: Get detailed information about YouTube videos
- 📥 **Flexible Download Options**: Choose video quality, format, and output directory
- 🎵 **Audio Extraction**: Download audio-only files in MP3 format
- 📊 **Real-time Progress**: Live download progress with speed and ETA
- 🎨 **Modern UI**: Windows 11 style interface with smooth animations
- ⚡ **Async Backend**: Non-blocking downloads using Tokio runtime
- 🔧 **Customizable**: Full control over yt-dlp options

## Screenshots

The application features a clean, modern interface with:
- Video input form with URL validation
- Video information display with thumbnail
- Download options modal with quality selection
- Real-time progress tracking
- Windows 11 style design elements

## Prerequisites

Before running the application, ensure you have:

1. **yt-dlp.exe** in the `src-tauri/utils/` folder
2. **ffmpeg.exe** in the `src-tauri/utils/` folder (for audio conversion)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ytdlx
```

2. Install dependencies:
```bash
yarn install
```

3. Download required utilities:
   - Download [yt-dlp.exe](https://github.com/yt-dlp/yt-dlp/releases) and place it in `src-tauri/utils/`
   - Download [ffmpeg.exe](https://ffmpeg.org/download.html) and place it in `src-tauri/utils/`

4. Run the development server:
```bash
yarn tauri dev
```

## Usage

1. **Enter YouTube URL**: Paste a YouTube video URL in the input field
2. **Fetch Video Info**: Click "Fetch Video" to get video metadata
3. **Select Download Options**: Choose quality, format, and output directory
4. **Start Download**: Click "Start Download" to begin the download process
5. **Monitor Progress**: Watch the real-time progress in the bottom-right corner

## Download Options

### Video Quality
- **Best**: Highest available quality
- **Worst**: Lowest available quality
- **720p, 480p, 360p, 144p**: Specific resolutions

### Output Formats
- **MP4**: Standard video format
- **MP3**: Audio-only format
- **WebM**: Web-optimized format

### Download Types
- **Video**: Download video with audio
- **Audio Only**: Extract audio only

## Technical Details

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Modern Windows 11** design system

### Backend
- **Rust** with **Tokio** for async operations
- **yt-dlp** integration for video downloading
- **FFmpeg** for audio conversion
- **Real-time progress** tracking

### Architecture
- **Tauri** for desktop app framework
- **Async/await** for non-blocking operations
- **State management** with React hooks
- **Type-safe** communication between frontend and backend

## Development

### Project Structure
```
ytdlx/
├── src/                    # Frontend React code
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── src-tauri/            # Backend Rust code
│   ├── src/              # Rust source code
│   └── utils/            # External utilities (yt-dlp, ffmpeg)
└── public/               # Static assets
```

### Key Components

#### Frontend Components
- `VideoInput`: URL input and metadata fetching
- `VideoInfo`: Video information display
- `DownloadOptions`: Download configuration modal
- `DownloadProgress`: Real-time progress tracking

#### Backend Functions
- `get_video_metadata`: Fetch video information using yt-dlp
- `start_download`: Initiate download with progress tracking
- `get_download_progress`: Get current download status

### Building for Production

```bash
yarn tauri build
```

This will create a distributable package in `src-tauri/target/release/`.

## Troubleshooting

### Common Issues

1. **yt-dlp not found**: Ensure yt-dlp.exe is in the utils folder
2. **Download fails**: Check internet connection and video availability
3. **Format not available**: Some videos may not have all quality options

### Error Messages

- **"yt-dlp not found"**: Download and place yt-dlp.exe in utils folder
- **"Failed to fetch video metadata"**: Check URL validity and internet connection
- **"Download failed"**: Verify video is available and not region-restricted

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) for video downloading
- [FFmpeg](https://ffmpeg.org/) for media processing
- [Tauri](https://tauri.app/) for the desktop framework
- [React](https://reactjs.org/) for the UI framework
