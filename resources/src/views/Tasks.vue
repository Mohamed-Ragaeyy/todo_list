<template>

    <div class="p-10">
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected"
                        :disabled="!selectedTasks || !selectedTasks.length" />
                </template>

                <template #center v-if="user">
                    <h1 class="text-xl">Hello {{ user.name }}</h1>
                </template>
                <template #end>
                    <Button label="Logout" icon="pi pi-sign-out" outlined @click="onLogout" />
                </template>
            </Toolbar>
            <!-- DataTable -->
            <DataTable ref=" dt" v-model:selection="selectedTasks" :value="tasks" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Tasks</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="title" header="Title" sortable style="min-width: 12rem"></Column>
                <Column field="date" header="Date" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        {{ formatDate(slotProps.data.date) }}
                    </template>
                </Column>
                <Column field="description" header="Description" sortable style="min-width: 16rem"></Column>

                <Column field="category.name" header="Category" sortable style="min-width: 10rem"></Column>

                <Column field="task_status" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.task_status"
                            :severity="getStatusLabel(slotProps.data.task_status)" />
                    </template>
                </Column>
                <Column header="Action" :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editTask(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteTask(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <br>

        <!-- Add & Edit -->
        <Dialog v-model:visible="taskDialog" :style="{ width: '450px' }" header="Task Details" :modal="true">
            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit">

                <div class="flex flex-col gap-6">
                    <div>
                        <label for="title" class="block font-bold mb-3">Title</label>
                        <InputText id="title" name="title" v-model="task.title" type="text" autofocus fluid />
                        <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{
                            $form.title.error?.message }}</Message>
                    </div>
                    <div>
                        <label for="date" class="block font-bold mb-3">Date</label>
                        <DatePicker dateFormat="dd/mm/yy" name="date" id="date" v-model="task.date" fluid />
                        <Message v-if="$form.date?.invalid" severity="error" size="small" variant="simple">{{
                            $form.date.error?.message }}</Message>
                    </div>
                    <div>
                        <label for="description" name="description" class="block font-bold mb-3">Description</label>
                        <Textarea id="description" v-model="task.description" rows="3" cols="20" fluid />
                    </div>
                    <div>
                        <label for="task_status" class="block font-bold mb-3">Status</label>
                        <Select id="task_status" name="task_status" v-model="task.task_status" :options="statuses"
                            placeholder="Select a Status" fluid></Select>
                        <Message v-if="$form.task_status?.invalid" severity="error" size="small" variant="simple">{{
                            $form.task_status.error.message
                        }}</Message>
                    </div>
                    <div>
                        <label for="category" class="block font-bold mb-3">category</label>
                        <Select id="category" name="category" v-model="task.category" :options="categories"
                            optionLabel="name" placeholder="Select a category" fluid></Select>
                        <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{
                            $form.category.error.message
                        }}</Message>
                    </div>

                </div>

                <Button class="mt-6" type="submit" label="Submit" icon="pi pi-check" />

            </Form>
        </Dialog>
        <!-- Delete Task -->
        <Dialog v-model:visible="deleteTaskDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="task">Are you sure you want to delete <b>{{ task.title }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteTaskDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteTask" />
            </template>
        </Dialog>
        <!-- Delete Tasks -->

        <Dialog v-model:visible="deleteTasksDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="task">Are you sure you want to delete the selected tasks?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteTasksDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteSelectedTasks" />
            </template>
        </Dialog>
    </div>
</template>
<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref, reactive, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { Form } from '@primevue/forms';
import { useAuth } from '@/composables/useAuth';
import { useTasks } from '@/composables/useTasks';

const toast = useToast();
const dt = ref();
const taskDialog = ref(false);
const deleteTaskDialog = ref(false);
const deleteTasksDialog = ref(false);

const selectedTasks = ref([]);
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const statuses = ref(['completed', 'pending', 'canceled']);
const task = ref({});
let initialValues = reactive({
    title: '',
    description: '',
    task_status: '',
    category: '',
    date: '',
});

// Composables
const { getUser, user, logout } = useAuth();
const {
    tasks,
    categories,
    fetchTasks,
    fetchCategories,
    errorMessage,
    createTask,
    updateTask,
    deleteTaskById
} = useTasks();

// On Mounted
onMounted(async () => {
    await getUser();
    await fetchTasks();
    await fetchCategories();
});

// Methods
const openNew = () => {
    task.value = {};
    taskDialog.value = true;
};

const saveTask = async () => {
    if (task.value.id) {
        // Update Task
        await updateTask(task.value.id, task.value);
        if (errorMessage.value)
            toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
        else
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Task Updated', life: 3000 });
    } else {
        // Create Task
        await createTask(task.value);
        if (errorMessage.value)
            toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
        else
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 });
    }
    if (!errorMessage.value)
        taskDialog.value = false;
};

const editTask = (item) => {
    task.value = { ...item };
    initialValues = reactive(task.value);
    taskDialog.value = true;
};

const confirmDeleteTask = (item) => {
    task.value = item;
    deleteTaskDialog.value = true;
};

const deleteTask = async () => {
    await deleteTaskById(task.value.id);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Task Deleted', life: 3000 });
    deleteTaskDialog.value = false;
    await fetchTasks(); // Refresh tasks
};

const confirmDeleteSelected = () => {
    deleteTasksDialog.value = true;
};

const deleteSelectedTasks = async () => {
    const idsToDelete = selectedTasks.value.map((t) => t.id);
    console.log(idsToDelete);
    idsToDelete.forEach(async (id) => {
        await deleteTaskById(id);
    });
    if (errorMessage.value)
        toast.add({ severity: 'error', summary: 'Error', detail: errorMessage.value, life: 3000 });
    else toast.add({ severity: 'success', summary: 'Successful', detail: 'Tasks Deleted', life: 3000 });
    deleteTasksDialog.value = false;
    await fetchTasks(); // Refresh tasks
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'completed':
            return 'success';
        case 'pending':
            return 'warn';
        case 'canceled':
            return 'danger';
        default:
            return null;
    }
};

const resolver = ({ values }) => {
    const errors = {};
    if (!values.title) {
        errors.title = [{ message: 'Title is required.' }];
    }
    if (!values.task_status) {
        errors.task_status = [{ message: 'Status is required.' }];
    }
    if (!values.category) {
        errors.category = [{ message: 'Category is required.' }];
    }
    if (!values.date) {
        errors.date = [{ message: 'Date is required.' }];
    }
    return { errors };
};

const onFormSubmit = ({ valid }) => {
    if (valid) saveTask();
};

const onLogout = async () => {
    await logout();
};

const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options); // dd/mm/yyyy format
};
</script>
