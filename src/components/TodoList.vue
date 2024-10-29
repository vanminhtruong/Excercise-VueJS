<template>
  <div class="todo-list-container">
    <div class="tabs">
      <button 
        :class="{'active': activeTab === 'Messages'}" 
        @click="activeTab = 'Messages'"
      >
        Messages
      </button>
      <button 
        :class="{'active': activeTab === 'Today'}" 
        @click="activeTab = 'Today'"
      >
        Today's Task
      </button>
      <button 
        :class="{'active': activeTab === 'LastActivity'}" 
        @click="activeTab = 'LastActivity'"
      >
        Last Activity
      </button>
    </div>

    <div class="group">
      <div class="current-date">
        {{ formattedDate }}
      </div>

      <div class="button-group">
        <button class="new-task-button" @click="showNewTaskModal = true">
          + New Task
        </button>
        <!-- Delete All Button -->
        
      </div>
    </div>
 
    <div v-if="activeTab === 'Messages'">

      <p>No new messages.</p>
    </div>

    <div v-else-if="activeTab === 'Today'">
      <div class="show-done">
        <label>
          <input type="checkbox" v-model="showDone" />
          Show Done
        </label>

        <button class="delete-all-button" @click="deleteAllTasks">
          Xóa tất cả
        </button>
      </div>

      <div class="task-categories">
        <button 
          :class="{'active-category': currentCategory === category.name}" 
          v-for="category in categories" 
          :key="category.name"
          @click="currentCategory = category.name"
        >
          {{ category.name }} ({{ category.count }})
        </button>
      </div>

      <div class="tasks" v-if="!showDone">
        <div 
          class="task" 
          v-for="task in filteredTasks" 
          :key="task.id"
          :class="{'completed': task.completed}"
        >
          <input 
            type="checkbox" 
            v-model="task.completed" 
            @change="toggleTaskCompletion(task)"
          />
          <div class="task-details">
            <h3>{{ task.title }}</h3>
            <p>Project: {{ task.project }}</p>
            <p>Start: {{ formatTime(task.startTime) }} - End: {{ formatTime(task.endTime) }}</p>
            <div class="avatars">
              <img 
                v-for="user in task.assignees" 
                :key="user.id" 
                :src="user.avatar" 
                :alt="user.name"
                class="avatar"
              />
            </div>
          </div>
          <button class="archive-button" @click="archiveTask(task)">
            Archive
          </button>
          <!-- Undo Completion Button -->
          <button 
            v-if="task.completed" 
            class="undo-button" 
            @click="undoTaskCompletion(task)"
          >
            Undo
          </button>
          <!-- Edit Button -->
          <button class="edit-button" @click="openEditTaskModal(task)">
            Edit
          </button>
        </div>
      </div>

      <div class="completed-tasks" v-else>
        <h2>Completed Tasks</h2>
        <div 
          class="task completed" 
          v-for="task in closedTasks" 
          :key="task.id"
        >
          <div class="task-details">
            <h3>{{ task.title }}</h3>
            <p>Project: {{ task.project }}</p>
            <p>Start: {{ formatTime(task.startTime) }} - End: {{ formatTime(task.endTime) }}</p>
            <div class="avatars">
              <img 
                v-for="user in task.assignees" 
                :key="user.id" 
                :src="user.avatar" 
                :alt="user.name"
                class="avatar"
              />
            </div>
          </div>
          <button class="archive-button" @click="archiveTask(task)">
            Archive
          </button>
          <!-- Undo Completion Button -->
          <button 
            class="undo-button" 
            @click="undoTaskCompletion(task)"
          >
            Undo
          </button>
          <!-- Edit Button -->
          <button class="edit-button" @click="openEditTaskModal(task)">
            Edit
          </button>
        </div>
        <p v-if="closedTasks.length === 0">No completed tasks.</p>
      </div>
    </div>

    <div v-else-if="activeTab === 'LastActivity'">
      <!-- Last Activity Content -->
      <div class="activities">
        <div 
          class="activity" 
          v-for="activity in activities" 
          :key="activity.id"
        >
          <p>{{ activity.description }}</p>
          <span>{{ formatDate(activity.timestamp) }}</span>
        </div>
      </div>
    </div>

    <!-- New Task Modal -->
    <div v-if="showNewTaskModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showNewTaskModal = false">&times;</span>
        <h2>New Task</h2>
        <form @submit.prevent="addTask">
          <label for="title">Title:</label>
          <input id="title" v-model="newTask.title" required />

          <label for="project">Project:</label>
          <input id="project" v-model="newTask.project" required />

          <label for="startTime">Start Time:</label>
          <input id="startTime" type="time" v-model="newTask.startTime" required />

          <label for="endTime">End Time:</label>
          <input id="endTime" type="time" v-model="newTask.endTime" required />

          <label for="assignees">Assignees:</label>
          <select id="assignees" v-model="newTask.assignees" multiple>
            <option v-for="user in users" :key="user.id" :value="user">
              {{ user.name }}
            </option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>

    <!-- Edit Task Modal -->
    <div v-if="showEditTaskModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditTaskModal">&times;</span>
        <h2>Edit Task</h2>
        <form @submit.prevent="saveTask">
          <label for="edit-title">Title:</label>
          <input id="edit-title" v-model="editedTask.title" required />

          <label for="edit-project">Project:</label>
          <input id="edit-project" v-model="editedTask.project" required />

          <label for="edit-startTime">Start Time:</label>
          <input id="edit-startTime" type="time" v-model="editedTask.startTime" required />

          <label for="edit-endTime">End Time:</label>
          <input id="edit-endTime" type="time" v-model="editedTask.endTime" required />

          <label for="edit-assignees">Assignees:</label>
          <select id="edit-assignees" v-model="editedTask.assignees" multiple>
            <option v-for="user in users" :key="user.id" :value="user">
              {{ user.name }}
            </option>
          </select>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Reactive State
const activeTab = ref('Today');
const currentCategory = ref('All');
const showNewTaskModal = ref(false);
const showDone = ref(false);

// Edit Task State
const showEditTaskModal = ref(false);
const editedTask = ref(null);

// Sample Data
const users = ref([
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/150?img=3' },
]);

// Initialize Tasks from localStorage or use sample data
const tasks = ref([]);
const storedTasks = localStorage.getItem('todo_tasks');
if (storedTasks) {
  tasks.value = JSON.parse(storedTasks);
} else {
  tasks.value = [
    {
      id: 1,
      title: 'Design Homepage',
      project: 'Crypto Wallet Redesign',
      startTime: '09:00',
      endTime: '11:00',
      completed: false,
      assignees: [users.value[0], users.value[1]],
      archived: false,
      timestamp: new Date(),
    },
    // Add more sample tasks as needed
  ];
}

const activities = ref([]);
const storedActivities = localStorage.getItem('todo_activities');
if (storedActivities) {
  activities.value = JSON.parse(storedActivities);
} else {
  activities.value = [
    {
      id: 1,
      description: 'Alice created a new task "Design Homepage".',
      timestamp: new Date(),
    },
  ];
}

const newTask = ref({
  title: '',
  project: '',
  startTime: '',
  endTime: '',
  assignees: [],
});

// Computed Properties for Task Filtering
const filteredAllTasks = computed(() => {
  return tasks.value.filter(task => {
    if (task.archived) return false;
    return showDone.value ? true : !task.completed;
  });
});

const openTasks = computed(() => {
  return tasks.value.filter(task => !task.completed && !task.archived);
});

const closedTasks = computed(() => {
  return tasks.value.filter(task => task.completed && !task.archived);
});

const archivedTasks = computed(() => {
  return tasks.value.filter(task => task.archived);
});

// Categories Computation
const categories = computed(() => {
  return [
    { name: 'All', count: filteredAllTasks.value.length },
    { name: 'Open', count: openTasks.value.length },
    { name: 'Closed', count: closedTasks.value.length },
    { name: 'Archived', count: archivedTasks.value.length },
  ];
});

const filteredTasks = computed(() => {
  if (activeTab.value !== 'Today') {
    return [];
  }

  switch (currentCategory.value) {
    case 'All':
      return filteredAllTasks.value;
    case 'Open':
      return tasks.value.filter(task => !task.completed && !task.archived);
    case 'Closed':
      return showDone.value
        ? closedTasks.value.filter(task => !task.archived)
        : [];
    case 'Archived':
      return archivedTasks.value;
    default:
      return [];
  }
});

const formattedDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
});

function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}

function toggleTaskCompletion(task) {
  task.completed = true;
  addActivity(`Task "${task.title}" marked as completed.`);
}

function undoTaskCompletion(task) {
  task.completed = false;
  addActivity(`Task "${task.title}" marked as incomplete.`);
}

function addTask() {
  const newTaskId = tasks.value.length + 1;
  tasks.value.push({
    id: newTaskId,
    title: newTask.value.title,
    project: newTask.value.project,
    startTime: newTask.value.startTime,
    endTime: newTask.value.endTime,
    completed: false,
    assignees: newTask.value.assignees,
    archived: false,
    timestamp: new Date(),
  });
  addActivity(`Task "${newTask.value.title}" added.`);
  newTask.value = {
    title: '',
    project: '',
    startTime: '',
    endTime: '',
    assignees: [],
  };
  showNewTaskModal.value = false;
}

function archiveTask(task) {
  task.archived = true;
  addActivity(`Task "${task.title}" archived.`);
}

function addActivity(description) {
  activities.value.unshift({
    id: activities.value.length + 1,
    description,
    timestamp: new Date(),
  });
}

// Edit Task Functions
function openEditTaskModal(task) {
  editedTask.value = { ...task }; // Clone the task to edit
  showEditTaskModal.value = true;
}

function closeEditTaskModal() {
  showEditTaskModal.value = false;
  editedTask.value = null;
}

function saveTask() {
  const index = tasks.value.findIndex(t => t.id === editedTask.value.id);
  if (index !== -1) {
    tasks.value[index] = { ...editedTask.value };
    addActivity(`Task "${editedTask.value.title}" updated.`);
  }
  closeEditTaskModal();
}

// Delete All Tasks Function
function deleteAllTasks() {
  if (confirm('Bạn có chắc chắn muốn xóa tất cả các công việc và hoạt động?')) {
    tasks.value = [];
    activities.value = [];
    localStorage.removeItem('todo_tasks');
    localStorage.removeItem('todo_activities');
    addActivity('Tất cả các công việc và hoạt động đã được xóa.');
  }
}

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('todo_tasks', JSON.stringify(newTasks));
  },
  { deep: true }
);

watch(
  activities,
  (newActivities) => {
    localStorage.setItem('todo_activities', JSON.stringify(newActivities));
  },
  { deep: true }
);
</script>

<style src="../assets/styles/todolist.css">
  
</style>