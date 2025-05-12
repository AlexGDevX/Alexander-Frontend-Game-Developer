import os
import random
from datetime import datetime
today = datetime.today()
try:
    NUM_COMMITS = int(input("Enter the number of commits to create: "))
except ValueError:
    print("Please enter a valid integer for the number of commits.")
    exit(1)
try:
    year = int(input("Enter the year for the commits: "))
except ValueError:
    print("Please enter a valid year.")
    exit(1)
file_path = 'test.txt'
with open(file_path, 'a') as file:
    file.write('Initial commit\n')
os.system('git add test.txt')
os.system('git commit -m "Initial commit"')

for i in range(NUM_COMMITS):
    month = random.randint(1, 12)
    day = random.randint(1, 28)
    commit_date = datetime(year, month, day, 12, 0, 0)
    if commit_date > today:
        print(f"Skipping commit {i+1}, date {commit_date.date()} is in the future.")
        continue
    with open(file_path, 'a') as file:
        file.write(f'Commit for {commit_date}\n')
    os.system('git add test.txt')
    os.system(f'git commit --date="{commit_date}" -m "Commit #{i+1}"')
os.system('git push -u origin main')
