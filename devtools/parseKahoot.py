# Prints an array of all Kahoot questions converted to the ADL multiple_choice data object
import json
import requests

# CHANGE URL TO YOUR KAHOOT
url = 'https://create.kahoot.it/details/951f4c0e-b6d7-4aed-8853-cf0e82c2d3ca'

kahoot_id = url.split('/')[-1]
answers_url = 'https://create.kahoot.it/rest/kahoots/{kahoot_id}/card/?includeKahoot=true'.format(kahoot_id=kahoot_id)
data = requests.get(answers_url).json()

object = []

for q in data['kahoot']['questions']:
    curr = {"type": "multiple_choice", "question": q['question'], "descriptions": [ "Desc1", "Desc2", "Desc3","Desc4"],"points": 5,"coins": 1, "answers": []}
    for choice in q['choices']:
        curr["answers"].append(choice['answer'].replace('&nbsp;', ' ').replace("''", ""))
        if choice['correct']:
            curr["correct"] = len(curr["answers"]) - 1
    object.append(curr)
print(object)