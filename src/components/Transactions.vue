<template>
  <div class="container">
    <!-- Filter Transactions Section -->
    <div class="card mt-4">
      <div class="card-header">
        <h3>Filter Transactions</h3>
      </div>
      <div class="card-body d-flex justify-content-between">
        <div class="form-group col-md-4">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="startDate" class="form-control">
        </div>
        <div class="form-group col-md-4">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="endDate" class="form-control">
        </div>
        <div class="form-group">
          <button class="btn btn-secondary btn-sm" @click="resetFilter">Reset Filter</button>
        </div>
      </div>
    </div>

    <!-- Transactions Section -->
    <div class="card mt-4">
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
          <tr v-for="transaction in filteredTransactions" :key="transaction.id">
            <td>{{ formatDate(transaction.dateTime) }}</td>
            <td>{{ transaction.amount }} €</td>
            <td :class="getClassForTransactionType(transaction.type)">
              <font-awesome-icon icon="money-bill-transfer" />
              {{ transaction.type === 'DEPOSIT' ? 'DEPOSIT' : 'WITHDRAWAL' }}
            </td>
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
  name: "Transactions",
  data() {
    return {
      transactions: [],
      startDate: '',
      endDate: ''
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.startDate || !this.endDate) {
        return this.transactions;
      }
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.dateTime);
        return transactionDate >= start && transactionDate <= end;
      });
    }
  },
  mounted() {
    const userId = this.$route.params.userId;
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
      return type === 'DEPOSIT' ? 'text-success' : 'text-danger';
    },
    resetFilter() {
      this.startDate = '';
      this.endDate = '';
    }
  }
};
</script>

<style>
.text-success {
  color: green;
}

.text-danger {
  color: red;
}
</style>
