<template>
    <div class="card flex justify-end p-2 mb-4">
        <ThemeSwitcher />
    </div>

    <div class="flex justify-content-center align-items-center min-h-screen">
        <Card class="text-center m-auto" style="width: 25rem;  hidden">
            <template #title>Register</template>
            <template #subtitle>Register to manage your tasks</template>
            <template #content>
                <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
                    <div class="flex flex-col gap-6">
                        <div>
                            <InputText name="name" v-model="user.name" type="text" placeholder="name" fluid />
                            <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
                                $form.name.error?.message
                                }}</Message>
                        </div>
                        <div>
                            <InputText name="email" v-model="user.email" type="text" placeholder="Email" fluid />
                            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                                $form.email.error?.message
                                }}</Message>
                        </div>
                        <div>
                            <Password placeholder="Password" name="password" v-model="user.password" :feedback="true"
                                fluid toggleMask />
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                                $form.password.error?.message
                                }}</Message>
                        </div>
                        <div>
                            <Password placeholder="Confirm Password" name="confirm_password"
                                v-model="user.confirm_password" :feedback="false" fluid />
                            <Message v-if="$form.confirm_password?.invalid" severity="error" size="small"
                                variant="simple">{{
                                    $form.confirm_password.error?.message
                                }}</Message>
                        </div>
                    </div>
                    <Button class="mt-6" type="submit" label="Register" :loading="isLoading" icon="pi pi-sign-in" />
                </Form>
            </template>
            <template #footer>
                Already have an account? <RouterLink to="/login" class="text-laravel">Login</RouterLink>
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
const { register, isLoading, errorMessage } = useAuth();

const user = ref({});
const router = useRouter();
const initialValues = reactive({
    name: "",
    email: '',
    password: '',
    confirm_password: ''
});
const resolver = ref(
    zodResolver(
        z.object({
            email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Invalid email address.' }),
            name: z.string().min(1, { message: 'Name is required.' }),
            password: z.string().min(1, { message: 'Password is required.' }),
            confirm_password: z.string().min(1, { message: 'Confirm Password is required.' }),
        })
    )
);


const onFormSubmit = ({ valid }) => {
    console.log(user.value);
    if (valid) {
        register(user.value.name, user.value.email, user.value.password, user.value.confirm_password);

    }


};
</script>
