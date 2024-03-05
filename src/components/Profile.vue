<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Transactions</h3>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead class="table table-header table-dark">
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ formatDate(transaction.dateTime) }}</td>
            <td>{{ transaction.amount }}</td>
            <td :class="getClassForTransactionType(transaction.type)">{{ transaction.type === 'DEPOSIT' ? 'DEPOSIT' : 'WITHDRAWAL' }}</td>
            <td>{{ transaction.status }}</td>
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  data() {
    return {
      content: {
        username: '',
        email: '',
        balance: 0
      },
      transactions: []
    };
  },
  mounted() {
    let userId = JSON.parse(localStorage.getItem('user')).id;
    UserService.getUserTransactions(userId).then(
        response => {
          this.transactions = response.data.content;
        },
        error => {
          console.error('Error fetching user transactions:', error);
        }
    );
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    getClassForTransactionType(type) {
      return type === 'DEPOSIT' ? 'success' : 'danger';
    }
  }
};
</script>

<style>
.success {
  color: green;
}

.danger {
  color: red;
}
</style>
