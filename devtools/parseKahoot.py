# Prints an array of all Kahoot questions converted to the ADL multiple_choice data object
from ast import arg
import json
import requests
from sys import argv

# CHANGE URL TO YOUR KAHOOT
if len(argv) < 2:
    print(f"""
Prints an array of all Kahoot questions converted to the ADL multiple_choice data object.

USAGE: 
    python3 {argv[0]} [KAHOOT_LINK]
""")
    exit()

url = argv[1]
kahoot_id = url.split('/')[-1]
answers_url = 'https://create.kahoot.it/rest/kahoots/{kahoot_id}/card/?includeKahoot=true'.format(kahoot_id=kahoot_id)
data = requests.get(answers_url).json()

object = []

for q in data['kahoot']['questions']:
    curr = {"type": "multiple_choice", "question": q['question'], "descriptions": [ "Desc1", "Desc2", "Desc3","Desc4"],"points": 5,"coins": 1, "answers": []}
    for choice in q['choices']:
        curr["answers"].append(choice['answer'].replace('&nbsp;', ' '))
        if choice['correct']:
            curr["correct"] = len(curr["answers"]) - 1
    object.append(curr)

print(json.dumps(object, indent=4))