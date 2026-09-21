use std::process::{Child, Command};
use std::sync::Mutex;

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

use tauri::Manager;

struct LlamaServer(Mutex<Option<Child>>);

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from the Rust backend!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            let ai_dir = app
                .path()
                .resolve("ai", tauri::path::BaseDirectory::Resource)
                .expect("Failed to find bundled AI directory");

            let server_path = ai_dir.join("llama-server.exe");
            let model_path = ai_dir.join("gemma-3-1b-it-Q4_K_M.gguf");

            println!("Starting llama.cpp...");
            println!("Server: {:?}", server_path);
            println!("Model: {:?}", model_path);

            let mut command = Command::new(&server_path);

            command
                .current_dir(&ai_dir)
                .arg("-m")
                .arg(&model_path)
                .arg("--host")
                .arg("127.0.0.1")
                .arg("--port")
                .arg("8081");

            #[cfg(target_os = "windows")]
            command.creation_flags(0x08000000);

            let child = command
                .spawn()
                .expect("Failed to start llama-server.exe");

            println!("llama.cpp started with PID {}", child.id());

            app.manage(LlamaServer(Mutex::new(Some(child))));

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|app_handle, event| {
            if let tauri::RunEvent::ExitRequested { .. } = event {
                if let Some(state) = app_handle.try_state::<LlamaServer>() {
                    if let Ok(mut server) = state.0.lock() {
                        if let Some(mut child) = server.take() {
                            let _ = child.kill();
                            let _ = child.wait();
                        }
                    }
                }
            }
        });
}