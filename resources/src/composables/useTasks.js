// composables/useTasks.js
import { ref } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";

export function useTasks() {
    const tasks = ref([]);
    const categories = ref([]);
    const isLoading = ref(false);
    const errorMessage = ref(null);
    const toast = useToast();

    // Retrieve the token from localStorage
    const getToken = () => localStorage.getItem("authToken");

    // Fetch all tasks
    const fetchTasks = async () => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/tasks",
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );
            tasks.value = response.data.data;
        } catch (error) {
            errorMessage.value = "Failed to fetch tasks.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };

    // Fetch all categories
    const fetchCategories = async () => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/categories",
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );
            categories.value = response.data.data;
        } catch (error) {
            errorMessage.value = "Failed to fetch categories.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };

    // Create a new task
    const createTask = async (task) => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/tasks",
                {
                    ...task,
                    category_id: task.category.id,
                    date: formatDate(task.date),
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Task Created",
                life: 3000,
            });
            await fetchTasks(); // Refresh tasks
        } catch (error) {
            errorMessage.value = "Failed to create task.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };

    // Update an existing task
    const updateTask = async (id, updatedTask) => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/tasks/${id}`,
                {
                    ...updatedTask,
                    category_id: updatedTask.category.id,
                    date: formatDate(updatedTask.date),
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );
            toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Task Updated",
                life: 3000,
            });
            await fetchTasks(); // Refresh tasks
        } catch (error) {
            errorMessage.value = "Failed to update task.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };

    // Delete a task
    const deleteTaskById = async (id) => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Task Deleted",
                life: 3000,
            });

            await fetchTasks();
        } catch (error) {
            errorMessage.value = "Failed to delete task.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };
    const deleteTasks = async (ids) => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            await axios.post(
                `http://127.0.0.1:8000/api/tasks/bulk-destroy`,
                { ids: ids }, // Sending the task IDs in the request body
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );
            toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tasks Deleted",
                life: 3000,
            });

            await fetchTasks(); // Refresh the task list after deletion
        } catch (error) {
            errorMessage.value = "Failed to delete tasks.";
            console.error(error);
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3000,
                });
            isLoading.value = false;
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Get month and ensure it's 2 digits
        const day = d.getDate().toString().padStart(2, "0"); // Get day and ensure it's 2 digits
        const hours = d.getHours().toString().padStart(2, "0"); // Get hours and ensure it's 2 digits
        const minutes = d.getMinutes().toString().padStart(2, "0"); // Get minutes and ensure it's 2 digits
        const seconds = d.getSeconds().toString().padStart(2, "0"); // Get seconds and ensure it's 2 digits

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return {
        tasks,
        categories,
        isLoading,
        errorMessage,
        fetchTasks,
        fetchCategories,
        createTask,
        updateTask,
        deleteTaskById,
        deleteTasks,
    };
}
