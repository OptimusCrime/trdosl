# coding=utf8
# the above tag defines encoding for this document and is for Python 2.x compatibility

import re

regex = r"(\([0-9\.,]+\))"

input_str = ""
with open('backup.txt', 'r') as file:
    input_str = file.read().replace('\n', '')

matches = re.finditer(regex, input_str, re.MULTILINE)

output = ""

for matchNum, match in enumerate(matches, start=1):

    for groupNum in range(0, len(match.groups())):
        groupNum = groupNum + 1

        output += "[" + match.group(groupNum).replace('(', '').replace(')', '') + "],\n"

        #print ("Group {groupNum} found at {start}-{end}: {group}".format(groupNum = groupNum, start = match.start(groupNum), end = match.end(groupNum), group = match.group(groupNum)))

with open("Output.txt", "w") as text_file:
    text_file.write(output)
