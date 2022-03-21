# Prints an array of all Kahoot questions converted to the ADL multiple_choice data object
import json
import requests

# CHANGE URL TO YOUR KAHOOT
url = 'https://create.kahoot.it/details/aa473af0-787e-465c-a7f2-5b87145b4d9d'

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

print(json.dumps(object))