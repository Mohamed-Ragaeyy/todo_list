<template>
    <div class="flex justify-content-center align-items-center min-h-screen bg-surface-50">
        <Card class="text-center m-auto" style="width: 25rem;  hidden">
            <template #title>Login</template>
            <template #subtitle>Login to manage your tasks</template>
            <template #content>
                <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
                    <div class="flex flex-col gap-6">
                        <div>
                            <InputText name="email" v-model="user.email" type="text" placeholder="Email" fluid />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                                $form.email.error?.message
                            }}</Message>
                        </div>
                        <div>
                            <Password placeholder="Password" name="password" v-model="user.password" :feedback="false"
                                fluid toggleMask />
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                                $form.password.error?.message
                            }}</Message>
                        </div>
                    </div>
                    <Button class="mt-6" type="submit" label="Login" :loading="isLoading" icon="pi pi-sign-in" />
                </Form>
            </template>
            <template #footer>
                Don't have an account? <RouterLink to="/register" class="text-laravel">Register</RouterLink>
            </template>
        </Card>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import { RouterLink, useRouter } from 'vue-router';

import Password from 'primevue/password';
import { Form } from '@primevue/forms';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { z } from 'zod';
import { useAuth } from '@/composables/useAuth';
const { login, isLoading, errorMessage } = useAuth();

const user = ref({});
const router = useRouter();
const initialValues = reactive({
    email: '',
    password: '',
});
const resolver = ref(
    zodResolver(
        z.object({
            email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
            password: z.string().min(1, { message: 'Password is required.' }),
        })
    )
);


const onFormSubmit =  ({ valid }) => {
    console.log(user.value);
    if (valid) {
         login(user.value.email, user.value.password);

    } else {

    }


};
</script>
