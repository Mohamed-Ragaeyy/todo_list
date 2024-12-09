<template>
    <Toolbar class="mb-6">
     

        <template #start v-if="user">
            <h1 class="text-xl">Hello {{ user.name }}</h1>
        </template>
        <template #end>
            <div class="flex gap-2 items-center">
                <ThemeSwitcher />

                <Button label="Logout" icon="pi pi-sign-out" outlined @click="onLogout" />
            </div>
        </template>
    </Toolbar>
</template>
<script setup>
import { onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
const { getUser, user, logout } = useAuth();
// On Mounted
onMounted(async () => {
    await getUser();

});
const onLogout = async () => {
    await logout();
};

</script>
