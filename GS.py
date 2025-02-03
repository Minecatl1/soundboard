import os
import json

def get_sounds_from_folder(folder_path):
    sounds = []
    
    for subdir, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.mp3'):
                sound_name = os.path.basename(subdir)
                sound_path = os.path.join(subdir, file)
                image_path = os.path.join(subdir, f"{sound_name}.jpg")
                
                if os.path.exists(image_path):
                    sounds.append({
                        "name": sound_name,
                        "audio": sound_path,
                        "image": image_path
                    })

    return sounds

def save_sounds_to_json(sounds, output_file):
    with open(output_file, 'w') as json_file:
        json.dump(sounds, json_file, indent=4)

if __name__ == "__main__":
    folder_path = 'Assets'  # The folder containing the sound subfolders
    output_file = 'sounds.json'
    
    sounds = get_sounds_from_folder(folder_path)
    save_sounds_to_json(sounds, output_file)

    print(f"Successfully saved {len(sounds)} sounds to {output_file}")