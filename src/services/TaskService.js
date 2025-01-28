const TaskService = {
  getAll: async (Token) => {
    try {
      if (!Token) {
        throw new Error('Invalid or missing token');
      }

      const response = await fetch('http://127.0.0.1:8000/v1/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch tasks: ${errorData.detail || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  create: async (Token, taskData) => {
    try {
      if (!Token) {
        throw new Error('Invalid or missing token');
      }

      const response = await fetch('http://127.0.0.1:8000/v1/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create task: ${errorData.detail || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  update: async (Token, taskId, taskData) => {
    try {
      if (!Token) {
        throw new Error('Invalid or missing token');
      }

      const response = await fetch(`http://127.0.0.1:8000/v1/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update task: ${errorData.detail || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  delete: async (Token, taskId) => {
    try {
      if (!Token) {
        throw new Error('Invalid or missing token');
      }

      const response = await fetch(`http://127.0.0.1:8000/v1/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete task: ${errorData.detail || response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default TaskService;
