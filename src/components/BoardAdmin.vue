<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>User Information</h3>
      </div>
      <div class="card-body">
        <p><strong>Username:</strong> {{ content.username }}</p>
        <p><strong>Email:</strong> {{ content.email }}</p>
      </div>
    </div>

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
            <th>Authorization</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id" @click="getUserById(user.id)">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.balance }}</td>
            <td class="text-center text-danger"><font-awesome-icon icon="check" /></td>
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
  }
};
</script>