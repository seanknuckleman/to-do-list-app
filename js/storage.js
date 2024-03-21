// JavaScript File for a Local To-Do-List Application
// Sean Fisher
// February/March 2024
// /js/storage.js

// API of functions in this document:
// set_date()                           Onload function, creates the footer for the page, ‘copyright 2024 – current year’
// display_groups()                     Creates and displays all groups currently in localStorage on index.html
//    Calls:  create_grouping(key_name), set_date()
// send_to_new_task(key_name)           Save key_name into sessionStorage - go to new_task.html
// edit_group(key_name)                 Save the key_name into sessionStorage, go to edit_group.html
// delete_group(key_name)               Delete the group object from localStorage
// send_to_edit_task(key_name, taskID)  Save the inputs into sessionStorage - go to edit_task.html
// complete_task(key_name, taskID)      Flip the Boolean value for the selected task
// delete_task(key_name, taskID)        Delete the selected task and correct the IDs of other tasks
// create_grouping(key_name)            Returns the UI elements for a group with the given key_name
//    Calls:  create_display_group_tab(key_name), create_display_group_tasks(key_name)
// create_display_group_tab(key_name)   Return the tab heading for the grouping & create 3 buttons
//    Calls:  create_button(class_name, title, click_handler), send_to_new_task(key_name), edit_group(key_name), delete_group(key_name)
// create_display_group_tasks(key_name) Returns the task list for the grouping & create 3 buttons
//    Calls:  create_button(class_name, title, click_handler), send_to_edit_task(key_name), complete_task(key_name, taskID), delete_task(key_name, taskID)
// create_group()                       Returns a blank group object template
// set_group()                          Called when the new_group.html form is submitted, save group into localStorage
//    Calls:  create_group()
// load_group()                         Onload function, Retrieves key_name from sessionStorage
//    Calls:  set_color(), update_num_tasks_completed(), create_no_current_tasks()
// append_group()                       Called when the edit_group.html form is submitted, save group into localStorage
// create_no_current_tasks()            Append task list in edit_group.html with filler if there are no tasks
// update_num_tasks_completed()         Append task list in edit_group.html with tasks and counter
// update_color_preview()               Set the preview color box with the value on the slider when page loads
// set_color()                          Onload function, fixes the color preview and creates the footer
//    Calls:  update_color_preview(), set_date()
// load_group_name()                    Onload function, retrieves key_name and fills in the group name for the task
//    Calls:  set_date()
// set_task()                           Called when the new_task.html form is submitted, append task to end of the task array
// load_edit_task()                     Onload function, retrieves key_name & taskID from sessionStorage, fills in fields
//    Calls:  set_date()
// update_task()                        Called when the edit_task.html form is submitted, replace old task with new one

// Local and Session Storage functions used in this application
// namespace for Local Storage: window.localStorage or localStorage
// Save local: localStorage.setItem(key, value);
// Read local: localStorage.getItem(key);
// Remove local item: localStorage.removeItem(key);
// Clear local (all): localStorage.clear();
// Save Session item: sessionStorage.setItem(key,value)
// Read Session item: sessionStorage.getItem()
// Remove Session item: sessionStorage.removeItem(key);
// Clear Session (all) sessionStorage.clear();

// Editor Notes:
// index.html - Main page which lists all groups and their saved tasks (edit and remove buttons)
// new_group.html - Web form to create a new group
// new_task.html -  Web form to create a task (Only reachable by button on a group object)
// edit_group.html - Web form to update a group (Only reachable by button on a group object) (update existing groups only)
// edit_task.html - Web form to update a task (Only reachable by button on a group object) (update existing tasks only)
// about.html - Description and Details Page for the application

// Home Page (index.html)
//  This page shows a list of to-do items called ‘Tasks’, sorted into columns by ‘Groups’.
//  Groups are used to sort Tasks into easy-to-understand, color-coordinated containers
//  which are created through a link in the nav-bar which goes to the new_group.html page.
//  Groups that have been created appear on the home page with horizontal tabs displaying the group’s name and three buttons:
//      ‘Add a New Task - goes to new_task.html’,
//      ‘Edit Group - goes to edit_group.html’,
//      ‘Delete Group – deletes the group along with all its tasks’.
//  Tasks are displayed under their respective Group in a vertical list.
//  They display their task’s content and likewise also have three buttons:
//      ‘Update Task - goes to update_task.html’,
//      ‘Complete Task – marks a task as completed. A completed task is denoted by a dull
//            yellow background with blue dark font with a strikethrough the task content’,
//      ‘Delete Task - deletes the task from local storage and the group.’

// New Group Page (new_group.html)
//  This page is an empty HTML5 web form by default. If the user accidentally presses Save with the group name field empty,
//  the group won’t be saved. As long as some text is included in group name field,
//  the group should save as a JSON object of type: { groupName=key, value = 'groupColor, task[]'}
//  This page supports 'back button browser clicking' and navigation menu click-through but does not have a cancel button.

// Edit Group Page (edit_group.html)
//  This page is never reached by users, except to edit an existing group already saved by the application.
//  The site does not appear on the navigation menu. If the user accidentally accesses the page (for example with the back button)
//  the web form functions exactly as the new_group.html page does and can still be used to create a new grouping.
//  The page, when visited properly by clicking the ‘Edit Grouping’ button on a group’s heading tab on the home page,
//  brings up a form populated with the group’s name, color and all tasks currently assigned to that group.
//  The page allows the user to edit and save their group.

// New Task Page (new_task.html)
//  This page is never reached by users, except to add a new task to a group already saved by the application.
//  This page is an empty HTML5 web form by default. If the user accidentally presses Save with the task-content field empty,
//  the task won’t be saved. If some text is included in the task-content field, the task should save as and be added to
//  the JSON object’s task array in order of type: [ taskID, taskContentString, isTaskFinishedBool']
//  (The Boolean is instantiated false by default).
//  This page supports 'back button browser clicking' and navigation menu click-through but does not have a cancel button.
//  The page allows the user to create and save their task.

// Edit Task Page (edit_task.html)
//  This page is never reached by users, except to edit an existing group already saved by the application.
//  The site does not appear on the navigation menu. If the user accidentally accesses the page (for example with the back button)
//  the web form functions exactly as the new_task.html page does and can be used to create a new task. The page,
//  when visited properly by clicking the ‘Edit Task’ button on the task’s body on the home page,
//  it brings up a form populated with the group name that the task belongs to and the task’s content.
//  The page allows the user to edit and save their task.

// About To-Do-List (about.html)
//  This page is available on the main site navigation bar and provides the user with details on how to use the app.
//  The page also describes the nature of the limitations and expectations that should be known about data stored in the
//  app and the application’s technical limitations.

function set_date(){
  // Append the date to the footer of a page along with copyright text
  let now = new Date();
  let this_year = now.getFullYear();
  document.getElementById("footer_here").innerHTML =
    "Copyright by Sean Fisher - &copy; 2024 - " + this_year;
}

// Home Page functions
function display_groups() {
  // Get the group container and append all groups in localStorage to it (OnLoad function)
  const groupContainer = document.getElementById('display-groups');
  for (let i = 0; i < localStorage.length; i++) {
    const key_name = localStorage.key(i);
    groupContainer.appendChild( create_grouping(key_name) );
  }

  // If there are no groupings in local storage, inform the user
  if (localStorage.length === 0) {
    const warning = document.createElement('div');
    warning.classList.add('no-groups-warning');
    warning.innerText =
      "You Don't Seem To Have Any Groupings! \n" +
      "Click On The 'Create New Group' Button To Get Started!";
    groupContainer.appendChild(warning);
    document.getElementById('nav-new-group').style.color = '#ff2470';
  }

  sessionStorage.clear();
  set_date();
}
// Home Page Button Functions
function send_to_new_task( key_name ) {
  sessionStorage.setItem("local_temp", key_name)
  window.location.href = "pages/new_task.html";
}
function edit_group( key_name ) {
  // Save ls_key (group name) into session storage to be used on next page.
  // When the page changes, call the variable in session storage (local_temp)
  sessionStorage.setItem("local_temp", key_name.toString().trim());
  window.location.href = "pages/edit_group.html";
}
function delete_group( key_name ) {
  // Delete an item from local storage with this key name
  localStorage.removeItem(key_name);
  location.reload();
}
function send_to_edit_task( key_name, taskID ) {
  sessionStorage.setItem("local_temp", key_name);
  sessionStorage.setItem("local_temp_taskID", taskID);
  window.location.href = "pages/edit_task.html";
}
function complete_task( key_name, taskID ) {
  // Get tasks array from local storage
  const groupData = JSON.parse( localStorage.getItem(key_name) );

  // Find the corresponding task using the taskID (First element in a task)
  for ( let i=0; i<groupData.tasks.length; i++) {
    if (taskID === i) { // Fill in task content input field with previous value (Second element in a task)
      groupData.tasks[i][2] = !groupData.tasks[i][2];
    }
  }
  localStorage.setItem( key_name, JSON.stringify(groupData) );
  location.reload();
}
function delete_task( key_name, taskID ) {
  const groupData = JSON.parse( localStorage.getItem(key_name) );
  // Find the corresponding task using the taskID (First element in a task)
  for (let i= 0; i < groupData.tasks.length; i++) {
    // Find the task array element with same ID and delete it
    if (taskID === i) {
      console.log(groupData.tasks)
      groupData.tasks.splice(i, 1);
    }

    // Update the IDs of the other elements in the task array
    // Example of Problem: {0,1,2,3} -> splice(1, 1) -> {0,2,3}
    // Lowers all ID elements after the deletion by one to fix this
    if (i > taskID) {
      groupData.tasks[i][0] = groupData.tasks[i][0] - 1;
    }
  }

  localStorage.setItem( key_name, JSON.stringify(groupData) );
  location.reload();
}
// Create Groups Elements for Home Page Group Display
function create_grouping( key_name ) {
  // Create the container for the group's individual parts
  const groupingElement = document.createElement('div');
  groupingElement.classList.add('grouping');

  // Create the heading tab on the group display
  groupingElement.appendChild( create_display_group_tab( key_name ) );
  // Create the tasks for that group in group display
  groupingElement.appendChild( create_display_group_tasks( key_name ) );

  // Return the complete grouping element
  return groupingElement;
}
function create_display_group_tab( key_name ) {
  // Create the group tab element
  const groupTabElement = document.createElement('div');
  groupTabElement.classList.add('group-tab');
  groupTabElement.style.backgroundColor =
    "hsl(" + JSON.parse(localStorage.getItem(key_name)).groupColor + ", 85%, 50%)";

  // Create the group name span
  const groupNameSpan = document.createElement('span');
  groupNameSpan.textContent = key_name;

  // Create the buttons for the group tab
  const btnNewTask = create_button(
    'btn-newTask', 'Create a New Task',
    () => send_to_new_task(key_name)
  );
  const btnEditTask = create_button(
    'btn-editTask', 'Edit Grouping',
    () => edit_group(key_name));
  const btnDeleteTask = create_button(
    'btn-deleteTask', 'Delete Grouping',
    () => delete_group(key_name)
  );

  // Append elements to the group tab
  groupTabElement.appendChild(groupNameSpan);
  groupTabElement.appendChild(btnNewTask);
  groupTabElement.appendChild(btnEditTask);
  groupTabElement.appendChild(btnDeleteTask);

  return groupTabElement;
}
function create_display_group_tasks( key_name ) {
  // Retrieve group data for group name from local storage
  const groupData = JSON.parse( localStorage.getItem(key_name) );

  // Create the container for the tasks
  const taskList = document.createElement('div');
    taskList.classList.add('task-list');

  // Create a filler task so that the tab doesn't sit on nothing if there are no tasks yet
  if(groupData.tasks.length === 0) { // If there is a blank group - (no tasks)
    const taskElement = document.createElement('div');
      taskElement.classList.add('group-task');
      taskElement.classList.add('group-filler-task');
    const taskSpan = document.createElement('span');
      taskSpan.innerText = "There's No Tasks Left In This Group!"; // Put the content into the span

    // Append the filler task to the blank task element
    taskElement.appendChild(taskSpan);

    // Append the task to the task list
    taskList.appendChild(taskElement);
  }

  // Create a task with content in
  for (const task of groupData.tasks) {
    // Create the task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('group-task');

    // If task is completed append completed
    if (task[2] === true) {
      taskElement.classList.add('task-completed');
    }

    // Create the task content span
    const taskSpan = document.createElement('span');
    taskSpan.innerHTML = task[1]; // Put the content into the span

    // Create the buttons for the task
    let taskID = task[0];
    const btnEditTask = create_button(
      'btn-editTask', 'Edit Task',
      () => send_to_edit_task(key_name, taskID)
    );
    const btnCompleteTask = create_button(
      'btn-completeTask', 'Complete Task',
      () => complete_task(key_name, taskID)
    );
    const btnDeleteTask = create_button(
      'btn-deleteTask', 'Delete Task',
      () => delete_task(key_name, taskID)
    );

    // Append elements to the task element
    taskElement.appendChild(taskSpan);
    taskElement.appendChild(btnEditTask);
    taskElement.appendChild(btnCompleteTask);
    taskElement.appendChild(btnDeleteTask);

    // Append the task to the task list
    taskList.appendChild(taskElement);
  }
  return taskList;  // Return all the tasks for this groupName
}
function create_button( class_name, title, click_handler ) {
  // Create a button element with class and title
  const button = document.createElement('button');
    button.classList.add(class_name);
    button.title = title;

  // Add the function to the eventListeners
  button.addEventListener('click', click_handler);
  return button; // Return the button element
}
// Was planned for use in case, I couldn't put the task and or group in the dynamically created function.
// Since all groups and tasks in home page have spans in the same hierarchy as each other
// This method could be used to get key_name and task content from a sibling Node
// function get_span_text(button)  {
//   return button.parentNode.firstElementChild.innerHTML;
// }


// Group functions
function create_group() {
  // Create a new blank group object and return it
  return {
    groupColor: 1,  // hslVal (Hue value: Integer 1-360)
    tasks: [] // List of tasks to be displayed in index.html   EX: {ID, "Task Content", isCompletedBoolean}
  }
}
function set_group() {
  // Pull the group name (key) and color (value) from the web form
  const groupName = document.getElementById("group-name").value;      // String - name - ls_key
  const groupColor = document.getElementById("group-color").value;    // Int - HSLVal  - ls_value

  // If no group name was entered - leave early / don't save
  if (groupName === "") {
    window.location.href = "../index.html";
    return null;  // return early
  }

  // Create a new group object and set the color
  const group = create_group();
  group.groupColor = groupColor;

  // JSON stringify the object and save it to local storage
  const myJSON = JSON.stringify(group);
  localStorage.setItem(groupName, myJSON);
  window.location.href = "../index.html";
}
function load_group() {
  // Get the group object from local storage using the key name saved in session storage
  const localStoreKey = sessionStorage.getItem("local_temp"); // Retrieve the ls_key from session storage
  const groupData = JSON.parse(localStorage.getItem(localStoreKey));  // Parse the JSON string into an object

  // Get the previous values and fill in their respective fields
  document.getElementById("group-name").value = localStoreKey;          // Update group name field
  document.getElementById("group-color").value = groupData.groupColor;  // Update the slider

  // Set up the page elements on load and update the UI to match the data
  set_color();  // Updates the color preview box to the slider's value and calls set_date()
  update_num_tasks_completed(); // Update the counters displaying how many tasks are completed out of all tasks in this group

  // Create the task list preview
  if (groupData.tasks.length === 0) {
    create_no_current_tasks();  // Create the no current tasks template
  }
  else {  // Display all tasks - if completed show a different styling
    for (const task of groupData.tasks) {
      const tasksContainer = document.querySelector('.group-display-task-list');
      const taskBody = document.createElement('div');
      taskBody.classList.add('group-display-task');

      // If completed, style differently
      if (task[2] === true) {
        taskBody.classList.add('task-completed');
      }

      taskBody.textContent = task[1];

      tasksContainer.appendChild(taskBody);
    }
  }
}
function append_group() {
  // Get the group object from local storage using the key name saved in session storage
  const localStoreKey = sessionStorage.getItem("local_temp"); // Retrieve the ls_key from session storage

  // Retrieve values in both input fields
  const groupName = document.getElementById('group-name').value;
  const groupColor = document.getElementById("group-color").value;    // Int - HSLVal  - ls_value

  // Create a new group object and set the group color
  const group = create_group();
  group.groupColor = groupColor;

  // Retrieve the tasks from the old group and append them to new group
  const groupData = JSON.parse(localStorage.getItem(localStoreKey));  // Parse the JSON string into an object
  for (const task of groupData.tasks) {
    group.tasks.push(task);
  }

  // JSON stringify the object and set it to local storage
  const myJSON = JSON.stringify(group);
  localStorage.setItem(groupName, myJSON);

  // Saving data to local storage using the same key name replaces that data
  // But if the user changed the name of the group, then there would be duplicates
  // This deletes the old group so that there are no duplicates created
  if (localStoreKey !== groupName) {
    localStorage.removeItem(localStoreKey); // Delete the object with the old key name
  }

  // Before the user leaves the page, clear session storage
  sessionStorage.removeItem(localStoreKey);
  sessionStorage.clear();
  window.location.href = "../index.html";
}
function create_no_current_tasks() {
  // Get the parent container where tasks are displayed
  const parentContainer = document.querySelector('.group-display-task-list');

  // Create the first filler task
  const firstElement = document.createElement('div');
  firstElement.classList.add('group-display-task');
  firstElement.classList.add('filler-task');
  firstElement.textContent = "You Don't Have Any Tasks Yet...";

  // Create the second filler task
  const secondElement = document.createElement('div');
  secondElement.classList.add('group-display-task');
  firstElement.classList.add('filler-task');
  secondElement.textContent = "Create a Grouping and Get to Work!";

  // Append the elements to the parent container
  parentContainer.appendChild(firstElement);
  parentContainer.appendChild(secondElement);
}
function update_num_tasks_completed() {
  // Get the data from session storage
  const localStoreKey = sessionStorage.getItem("local_temp");
  const groupData = JSON.parse(localStorage.getItem(localStoreKey));

  // Loop through all tasks and if a task is completed increment the counter
  let numOfCompleted = 0;
  for (const task of groupData.tasks) { // If completed - add to counter
    if(task[2] === true) { numOfCompleted++; }  // task { "content", isTaskFinishedBoolean }
  }
  // Display the number of completed tasks out of the total number of tasks in this group
  document.getElementById("numOfTasks").innerText =
    "Current Number of Completed Tasks: " + numOfCompleted + " / " + groupData.tasks.length;
}
function update_color_preview() {
  // Grab the slider input and the group color display
  let hslSlider = document.getElementById("group-color");
  let colorPreview = document.getElementById("color-display");
  colorPreview.style.backgroundColor = "hsl(" + hslSlider.value + ", 100%, 50%)"; // Set the color to slider input value
}
function set_color() {
  update_color_preview();
  set_date();
}


// Task functions
function load_group_name() {
  document.getElementById('group-name').value = sessionStorage.getItem('local_temp').toString().trim();
  set_date();
}
function set_task() {
  // Pull the group name (key) and content (value) from the web form
  const ls_key = document.getElementById("group-name").value;
  const ls_value = document.getElementById("task-content").value;

  // If no content was entered - leave early / don't save
  if (ls_value === "") {
    window.location.href = "../index.html";
    return null;  // return early
  }

  // Get the group object from local storage
  const groupJSON = localStorage.getItem(ls_key);
  const groupData = JSON.parse(groupJSON);

  // Add new task to group object's tasks array
  let task = [groupData.tasks.length, ls_value, false]; // Task Data: {ID, "Task Content", isTaskCompletedBoolean}
  groupData.tasks.push(task);

  // JSON stringify the object and set it back to local storage using the same ls_key
  const myJSON = JSON.stringify(groupData);
  localStorage.setItem(ls_key, myJSON);
  window.location.href = "../index.html";
}
function load_edit_task() {
  // Fetch the session storage data
  const lskey = sessionStorage.getItem("local_temp");
  const taskID = parseInt( sessionStorage.getItem("local_temp_taskID") );

  // Get tasks array from local storage
  const groupData = JSON.parse( localStorage.getItem(lskey) );
  document.getElementById("group-name").value = lskey;

  // Find the corresponding task using the taskID (First element in a task)
  for ( let i=0; i<groupData.tasks.length; i++) {
    if (taskID === i) { // Fill in task content input field with previous value (Second element in a task)
      document.getElementById("task-content").value = groupData.tasks[i][1];
    }
  }
  set_date();
}
function update_task() {
  const groupName = document.getElementById("group-name").value
  const task = document.getElementById("task-content").value;
  const groupData = JSON.parse( localStorage.getItem(groupName).toString().trim() );
  const taskID = parseInt( sessionStorage.getItem("local_temp_taskID") );

  // Find the corresponding task using the taskID (First element in a task)
  for ( let i=0; i<groupData.tasks.length; i++) {
    if (taskID === i) { // Fill in task content input field with previous value (Second element in a task)
      groupData.tasks[i][1] = task;
    }
  }

  // Update local storage groupName with new groupData (Including updated task)
  localStorage.setItem( groupName, JSON.stringify(groupData) );

  // Remove session storage and redirect back home
  sessionStorage.removeItem("local_temp");
  sessionStorage.removeItem("local_temp_task");
  sessionStorage.clear()
  window.location.href = "../index.html";
}
