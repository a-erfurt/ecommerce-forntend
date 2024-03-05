<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>User Information</h3>
      </div>
      <div class="card-body">
        <p><strong>Username:</strong> {{ content.username }}</p>
        <p><strong>Email:</strong> {{ content.email }}</p>
        <p><strong>Balance:</strong> {{ content.balance }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "BoardUser",
  data() {
    return {
      content: {
        username: '',
        email: '',
        balance: 0
      },
      currentUser: null
    };
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem('user')).id;
      UserService.getUserBoard(userId).then(
          response => {
            this.content = response.data;
          },
          error => {
            this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
      );
  },
};
</script>

<style>

</style>
