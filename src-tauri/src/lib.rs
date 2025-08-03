use serde::{Deserialize, Serialize};
use std::path::Path;
use std::process::Stdio;
use tokio::process::Command;

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    downloads_directory: Option<String>,
    download_max_concurrent: u32,
    // Add other config options as needed
}

impl Default for Config {
    fn default() -> Self {
        Self {
            downloads_directory: Some(get_default_downloads_path()),
            download_max_concurrent: 1,
        }
    }
}

#[tauri::command]
fn get_config_downloads_max_concurrent() -> u32 {
    let config = load_config();
    config.download_max_concurrent
}

#[tauri::command]
fn set_config_downloads_max_concurrent(max_concurrent: u32) {
    let mut config = load_config();
    config.download_max_concurrent = max_concurrent;
    save_config(&config);
}

fn get_default_downloads_path() -> String {
    // if YTDLX_DOWNLOADS is set, return it
    if let Ok(path) = std::env::var("YTDLX_DOWNLOADS") {
        return path;
    }
    // otherwise, return the default downloads directory
    let path = std::env::var("USERPROFILE").unwrap_or_else(|_| std::env::var("HOME").unwrap());
    Path::new(&path)
        .join("Downloads")
        .to_str()
        .unwrap()
        .to_string()
}

#[tauri::command]
fn get_current_path() -> String {
    std::env::current_dir().unwrap().display().to_string()
}

#[tauri::command]
fn get_downloads_directory() -> String {
    let config = load_config();

    // Check if downloads directory is set in config
    if let Some(downloads_dir) = config.downloads_directory {
        return downloads_dir;
    }

    // Fall back to default behavior
    get_default_downloads_path()
}

#[tauri::command]
fn set_downloads_directory(downloads_directory: String) {
    let path = Path::new(&downloads_directory);
    if !path.is_dir() {
        // create directory
        std::fs::create_dir_all(path).unwrap();
    }

    // Load current config and update downloads directory
    let mut config = load_config();
    config.downloads_directory = Some(path.to_str().unwrap().to_string());
    save_config(&config);

    println!("Downloads directory set to {}", path.to_str().unwrap());
}

fn load_config() -> Config {
    match std::fs::read_to_string("settings.json") {
        Ok(config_str) => match serde_json::from_str(&config_str) {
            Ok(config) => config,
            Err(_) => {
                eprintln!("Failed to parse config.json, using default config");
                Config::default()
            }
        },
        Err(_) => {
            eprintln!("Config file not found, using default config");
            Config::default()
        }
    }
}

fn save_config(config: &Config) {
    match std::fs::write("settings.json", serde_json::to_string(config).unwrap()) {
        Ok(_) => println!("Config saved"),
        Err(_) => eprintln!("Failed to save config"),
    }
}

#[tauri::command]
async fn get_video_metadata(video_url: String) -> Result<String, String> {
    println!("Getting video metadata for {}", video_url);
    // Get the path to yt-dlp.exe
    let ytdlp_path = Path::new("utils").join("yt-dlp.exe");

    // Run yt-dlp with --dump-json flag
    let output = Command::new(ytdlp_path)
        .arg("--dump-json")
        .arg(&video_url)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .creation_flags(0x08000000) // CREATE_NO_WINDOW flag on Windows
        .output()
        .await
        .map_err(|e| format!("Failed to execute yt-dlp: {}", e))?;

    // Check if the command was successful
    if !output.status.success() {
        let error_message = String::from_utf8_lossy(&output.stderr);
        return Err(format!("yt-dlp failed: {}", error_message));
    }

    // Convert stdout to string
    let json_output = String::from_utf8(output.stdout)
        .map_err(|e| format!("Failed to parse yt-dlp output: {}", e))?;

    Ok(json_output)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let config = load_config();
    save_config(&config);

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_current_path,
            get_downloads_directory,
            set_downloads_directory,
            get_video_metadata,
            get_config_downloads_max_concurrent,
            set_config_downloads_max_concurrent,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
