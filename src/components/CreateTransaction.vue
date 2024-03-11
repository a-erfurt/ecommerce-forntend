<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Transaction</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="form-group col-md-8">
            <label for="transactionAmount">Amount</label>
            <input type="number" class="form-control" v-model="transactionData.amount" id="transactionAmount">
          </div>
          <div class="form-group col-md-4">
            <label for="transactionType">Transaction Type</label>
            <select id="transactionType" class="form-control" v-model="transactionData.type">
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
            </select>
          </div>
        </div>
        <button class="btn btn-primary mt-3" @click="createTransaction">Add Transaction</button>
        <router-link to="/user" class="btn btn-secondary mt-3">Back</router-link>
      </div>

    </div>

    <div v-if="showSuccessAlert" class="alert alert-success mt-3" role="alert">
      Transaction successful!
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "AddTransaction",
  data() {
    return {
      transactionData: {
        amount: null,
        type: 'DEPOSIT'
      },
      showSuccessAlert: false
    };
  },
  methods: {
    createTransaction() {
      let userId = JSON.parse(localStorage.getItem('user')).id;
      UserService.createTransaction(userId, this.transactionData).then(
          response => {
            console.log('Transaction created successfully:', response.data);
            this.showSuccessAlert = true;
            setTimeout(() => {
              this.$router.push('/user');
            }, 500);
          },
          error => {
            console.error('Error creating transaction:', error);
          }
      );
    }
  }

};
</script>
