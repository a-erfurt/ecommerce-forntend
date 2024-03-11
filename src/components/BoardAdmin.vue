<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-header">
        <h3>Users</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead class="table table-header table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Balance</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in sortedUsers" :key="user.id">
            <td @click="goToUserTransactions(user.id)">{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.balance }} €</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "BoardAdmin",
  data() {
    return {
      content: {
        username: '',
        email: ''
      },
      users: []
    };
  },
  computed: {
    sortedUsers() {
      return this.users
          .filter(user => user.username.toLowerCase() !== 'admin')
          .sort((a, b) => a.balance - b.balance);
    },
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem('user')).id;

    UserService.getAdminBoard(userId).then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        }
    );

    UserService.getAllUsers().then(
        response => {
          this.users = response.data.content;
        },
        error => {
          console.error('Error fetching users:', error);
        }
    );
  },
  methods: {goToUserTransactions(userId) {
      this.$router.push({ path: `/admin/${userId}/transactions` });
    },
  },
};
</script>