import re

# This script parses the extracted lat/lng positions from:
# https://developers.google.com/maps/documentation/utilities/polylineutility
# The data is extracted by editing the HTML markup of the "Locations list"
# on the page. The select values are parsed into a JSON object.

regex = r"(\([0-9\.,]+\))"

input_str = ""
with open('backup.txt', 'r') as file:
    input_str = file.read().replace('\n', '')

matches = re.finditer(regex, input_str, re.MULTILINE)

output = ""

for matchNum, match in enumerate(matches, start=1):

    for groupNum in range(0, len(match.groups())):
        groupNum = groupNum + 1

        output += "{ \"lat\": " + match.group(groupNum).replace('(', '').replace(')', '').replace(',', ', "lng": ') + " },\n"

        #print ("Group {groupNum} found at {start}-{end}: {group}".format(groupNum = groupNum, start = match.start(groupNum), end = match.end(groupNum), group = match.group(groupNum)))

with open("Output.txt", "w") as text_file:
    text_file.write(output)
