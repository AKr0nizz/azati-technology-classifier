import json

from modules.io import read_file_to_string, read_file_to_array, write_file

# Load contents
input_file_content = read_file_to_array("./data/input.txt")
technology_groups = json.loads(read_file_to_string(
    "./models/technologies.json"))["technologies"]

# Create and fill sample object with all the headlines
sample_object = {"technologies": []}
for group in technology_groups:
    sample_object["technologies"].append({
        "title": group["title"],
        "content": []
    })

# Process incomming data
for item in input_file_content:
    for group in technology_groups:
        if item in group["content"]:
            for sample_group in sample_object["technologies"]:
                if sample_group["title"] == group["title"]:
                    sample_group["content"].append(item)
            input_file_content.remove(item)

# Add all other entries as 'unidentified'
sample_object["technologies"].append({
    "title": "Unidentified",
    "content": input_file_content
})

print(sample_object)
