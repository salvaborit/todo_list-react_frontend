#!/usr/bin/python3
import requests

for i in range(200):
    resp = requests.delete(f'http://localhost:8000/api/tasks/{i}')
    print(resp.status_code)
