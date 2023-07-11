import { Injectable } from '@angular/core';

@Injectable()
export class Bookmarks {
  // Bookmark list
  public list: any[] = [];

  // Method to get the bookmarks for a user
  public get(userId: string): any {
    // Get the bookmarks from the database
    return fetch(`http://localhost:9000/bookmarks?user_id=${userId}`)
      .then(res => res.json())
      .then(res => {
        // Set the bookmark list
        this.list = res;

        // Return the bookmark list
        return res;
      });
  }

  // Method to add the course to the bookmark list
  public insert(userId: any, course: any): any {
    // Add the course to the bookmark list
    this.list.push(course);

    // Insert the bookmark into the database
    return fetch(`http://localhost:9000/bookmarks?user_id=${userId}`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, id: course.id, title: course.title, name: course.name })
    })
    .then(res => res.json())
    .then(res => res);
  }

  // Method to remove a course from the bookmark list
  public delete(userId: any, course: any): any {
    this.list = this.list.filter(
      (item: any) => item.id !== course.id
    );
    
    // Delete the bookmark from the database
    return fetch(`http://localhost:9000/bookmarks/?user_id=${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({ user_id: userId, id: course.id, title: course.title, name: course.name })
    })
    .then(res => res.json())
    .then(res => res);
  }
}
