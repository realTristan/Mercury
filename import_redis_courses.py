from course import Course
from redis_om import Migrator
import json

with open("data.json", "r") as file:
    data = json.load(file)
    for course in data:
        print("Imported: " + course["title"])
        if "pre_requisites" not in course or course["pre_requisites"] == None:
            course["pre_requisites"] = "None"
        Course(**course).save()

Migrator().run()