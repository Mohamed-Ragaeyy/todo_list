// composables/useAuth.js
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

export function useAuth() {
    const isLoading = ref(false);
    const errorMessage = ref(null);
    const router = useRouter();
    const toast = useToast();
    const user = ref(null);

    const login = async (email, password) => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                {
                    email,
                    password,
                }
            );
            const token = response.data.access_token; // Assume the API returns a token
            // Save the token in localStorage
            localStorage.setItem("authToken", token);

            // Redirect to the tasks
            router.push({ name: "tasks" });
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data) {
                errorMessage.value =
                    error.response.data.message || "Login failed.";
            } else {
                errorMessage.value = "An unexpected error occurred.";
            }
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3150,
                });

            isLoading.value = false;
        }
    };

    // Register function
    const register = async (name, email, password, confirm_password) => {
        isLoading.value = true;
        errorMessage.value = null;

        if (password != confirm_password) {
            errorMessage.value = "Passwords don't match.";
            isLoading.value = false;
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3150,
                });

            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/register",
                {
                    name,
                    email,
                    password,
                    password_confirmation: confirm_password,
                }
            );

            const token = response.data.access_token; // Assume the API returns a token

            // Save the token in localStorage
            localStorage.setItem("authToken", token);

            // Redirect to the dashboard
            router.push({ name: "tasks" });
        } catch (error) {
            if (error.response && error.response.data) {
                errorMessage.value =
                    error.response.data.message || "Registration failed.";
            } else {
                errorMessage.value = "An unexpected error occurred.";
            }
        } finally {
            if (errorMessage.value)
                toast.add({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage.value,
                    life: 3150,
                });

            isLoading.value = false;
        }
    };

    // Logout function
    const logout = () => {
        // Clear the auth token from localStorage
        localStorage.removeItem("authToken");

        // Redirect to the login page
        router.push({ name: "login" });
    };

    const getUser = async () => {
        isLoading.value = true;
        errorMessage.value = null;

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("No authentication token found.");
            }

            const response = await axios.get("http://127.0.0.1:8000/api/user", {
                headers: {
                      Authorization: `Bearer ${token}`,
                },
            });
            user.value = response.data; // Store user details
        } catch (error) {
            if (error.response && error.response.data) {
                errorMessage.value =
                    error.response.data.message || "Failed to fetch user.";
            } else {
                errorMessage.value = "An unexpected error occurred.";
            }
            if (error.status === 401) {
               logout();
            }
        } finally {
            isLoading.value = false;
        }
    };

    return {
        login,
        register,
        logout,
        getUser,
        user,
        isLoading,
        errorMessage,
    };
}
