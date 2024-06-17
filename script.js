// Selecting elements from the DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');

// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    const taskText = taskInput.value.trim(); // Get task input value and trim whitespace
    
    if (taskText !== '') {
        // Check if editing existing task
        const existingTask = document.querySelector('.edit-mode');
        
        if (existingTask) {
            // Update existing task text
            existingTask.querySelector('.task-text').textContent = taskText;
            existingTask.classList.remove('edit-mode');
        } else {
            // Create a new list item element
            const li = document.createElement('li');
            li.classList.add('task-item');
            
            // Create task text span
            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = taskText;
            li.appendChild(taskTextSpan);
            
            // Create edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            li.appendChild(editButton);
            
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            li.appendChild(deleteButton);
            
            // Append the new list item to the task list
            taskList.appendChild(li);
        }
        
        // Clear the input field after adding or updating the task
        taskInput.value = '';
    } else {
        // Alert user if input is empty (optional)
        alert('Please enter a task!');
    }
});

// Event delegation for delete and edit buttons
taskList.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.classList.contains('delete-btn')) {
        // Remove task item
        target.parentElement.remove();
    } else if (target.classList.contains('edit-btn')) {
        // Toggle edit mode
        const taskItem = target.parentElement;
        const taskTextSpan = taskItem.querySelector('.task-text');
        const taskText = taskTextSpan.textContent;
        
        // Set input field value to current task text
        taskInput.value = taskText;
        taskInput.focus();
        
        // Mark task item as in edit mode
        taskItem.classList.add('edit-mode');
    }
});

// Event listener for clicking outside of edit mode to cancel
document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (!target.closest('.task-item') && !target.closest('#task-form')) {
        // Clear input and exit edit mode
        taskInput.value = '';
        const editModeTask = document.querySelector('.edit-mode');
        if (editModeTask) {
            editModeTask.classList.remove('edit-mode');
        }
    }
});
