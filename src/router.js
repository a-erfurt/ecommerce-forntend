import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
const Transactions = () => import("./components/Transactions.vue");
const BoardAdmin = () => import("./components/BoardAdmin.vue");
const BoardUser = () => import("./components/BoardUser.vue");
const CreateTransaction = () => import("./components/CreateTransaction.vue");

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/transactions/userId",
        name: "transactions",
        component: Transactions,
    },
    {
        path: "/admin",
        name: "admin",
        component: BoardAdmin,
    },
    {
        path: "/createTransaction",
        name: "createTransaction",
        component: CreateTransaction,
    },
    {
        path: "/user",
        name: "user",
        component: BoardUser,
    },
    {
        path: "/admin/:userId/transactions",
        name: "userTransactions",
        component: Transactions,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
