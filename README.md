# to-do-list-app
Sean Fisher - February/March 2024 

Application Overview / Summary 

This to-do-list application allows site visitors to create a new group, add new tasks to that group, edit existing groups, edit existing tasks, mark a task as complete, delete their tasks, and delete their groups. There are no accounts, no service logins and no software to download. The data entered lives only on the device from which it is created.

There are only six pages to the entire site (index.html, new_group.html, new_task.html, edit_group.html, edit_task.html and about.html), one style sheet: style.css, and one main JavaScript file to control app functions storage.js. 

The site features seven buttons (Create a New Task – append a task to that group), (Edit Grouping – edit the group), (Delete Grouping – delete the grouping with all of its tasks), (Edit Task – edit the task), (Complete Task – mark the task as complete), (Delete Task – deletes the task from the grouping) and (Save - save the task or group just created).

The quantity (total number) of groups that can be created, and the length of each task created are limited by the storage capacity of the browser’s implementation of the HTML-5 localStorage standard. This means that some users will have larger storage areas than others, and the exact size of storage is subject to change over time. Typical local storage area is from 2 – 10 MB with 5 MB being average. (Maybe…)


Privacy of Data Stored by the Application

This to-do-list application does not save any information into the cloud (or online), but instead uses your local browser (like Firefox or Chrome) via HTML5 localStorage to save notes for later retrieval.

The benefit is that your information remains private to your device, and is never harvested, collected, shared or sold with any party anywhere in person or virtually.

The shortcoming is that (in its current configuration) your information is only available to you in the browser you created your data in, and it does not go from one browser to another, or from one laptop/phone you use to another. In addition, if your browser or device fails, there is no possibility of remote data recovery or retrieval.


Application Limitations

This to-do-list application is free to use but absolutely no warranty or guarantee is made about its performance, reliability, or security.

While a user might copy the code and run the app locally, online users must be notified that the application has no maintenance schedule and may without explanation one day disappear, change, be modified/updated or otherwise suddenly fail. 

