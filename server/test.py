import requests

# // Insert a bookmark
def insert_bookmark() -> None:
  resp: requests.Response = requests.post("http://localhost:8000/bookmarks", json={
    "user_id": "tristan",
    "id": "1",
    "title": "2",
    "name": "3"
  })
  print(resp.text)

# // Delete a bookmark
def delete_bookmark() -> None:
  resp: requests.Response = requests.delete("http://localhost:8000/bookmarks/", json={
    "user_id": "tristan",
    "id": "1",
    "title": "2",
    "name": "3"
  })
  print(resp.text)

# // Get the bookmarks
def get_bookmarks(user_id: str) -> None:
  resp: requests.Response = requests.get(f"http://localhost:8000/bookmarks/{user_id}")
  print(resp.text)

# // Run the functions
if __name__ == '__main__':
  insert_bookmark()
  get_bookmarks("tristan")
  #delete_bookmark()
  #get_bookmarks("tristan")