<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @click="showInputForm = true">Add Data</base-button>
          <modal :show.sync="showInputForm"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm">
              <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">                  
                  <template>
                      <div class="text-center text-muted mb-4">
                          <big>Add new sales data</big>
                      </div>
                      <form role="form">
                          <base-input alternative
                                      class="mb-3"
                                      placeholder="Email"
                                      addon-left-icon="ni ni-email-83">
                          </base-input>
                          <base-input alternative
                                      type="password"
                                      placeholder="Password"
                                      addon-left-icon="ni ni-lock-circle-open">
                          </base-input>                          
                          <div class="text-center">
                              <base-button block type="success" class="my-4">Save</base-button>
                          </div>
                      </form>
                  </template>
              </card>
          </modal>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Sales Name</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>DateTime</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <td>{{row.sales_name}}</td>
          <td>{{row.product_name}}</td>
          <td>{{row.price}}</td>
          <td>{{row.quantity}}</td>
          <td>{{row.ammount}}</td>
          <td>{{ moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss') }}</td>
          <td>
            <base-button type="danger" size="sm" icon="ni ni-fat-remove"></base-button>
            <base-button type="info" size="sm" icon="ni ni-settings-gear-65"></base-button>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total="this.rowCount"></base-pagination>
    </div>

  </div>
</template>
<script>
/* eslint-disable */
  import Sales from '@/services/Sales'  
  export default {
    name: 'sales-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        tableData: [],
        rowCount: 0,
        showInputForm: false
      }
    },    
    created: async function () {
      const response = await Sales.list()  
      this.tableData = response.data.rows   
      this.rowCount = response.data.count       
    }
  }
</script>
<style>
</style>
