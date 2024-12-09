import { createRouter, createWebHistory } from "vue-router";
import Tasks from "@/views/Tasks.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import NotFoundView from "@/views/NotFoundView.vue";
const routes = [
    {
        path: "/",
        redirect: "/tasks",
        name: "home",
        children: [
            {
                path: "/login",
                name: "login",
                component: Login,
            },
            {
                path: "/register",
                name: "register",
                component: Register,
            },
            {
                path: "/tasks",
                name: "tasks",
                component: Tasks,
            },
            {
                path: "/:catchAll(.*)",
                name: "not-found",
                component: NotFoundView,
            },
        ],
    }, // Default route
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
    const authToken = localStorage.getItem("authToken"); // Check if user is logged in

    if (to.name === "tasks" && !authToken) {
        next({ name: "login" }); // Redirect to Register if not logged in
    } else if ((to.name === "login" || to.name === "register") && authToken) {
        next({ name: "tasks" }); // Redirect to Dashboard if logged in
    } else {
        next(); // Proceed to the route
    }
});

export default router;
