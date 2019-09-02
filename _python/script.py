import json

from modules.io import read_file_to_string, read_file_to_array, write_string_file

# Load contents
input_file_content = list(set(read_file_to_array("./data/input.txt")))
technologies = json.loads(read_file_to_string(
    "./models/technologies.json"))["technologies"]

# Create and fill sample object with all the headlines
sample_object = {"technologies": {}}
for attr, value in technologies.items():
    sample_object["technologies"][attr] = []

# Process incomming data
for item in input_file_content:
    for attr, value in technologies.items():
        if item.lower() in list(map(lambda x: x.lower(), value)):
            sample_object["technologies"][attr].append(item)
            input_file_content.remove(item)

# Classify all other entries as "unidentified"
sample_object["technologies"]["Unidentified"] = input_file_content

print(sample_object["technologies"]["Unidentified"])
write_string_file("./data/output.json", json.dumps(sample_object))
