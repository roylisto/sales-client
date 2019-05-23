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
               modal-classes="modal-dialog-centered">
              <card type="secondary" shadow
                    header-classes="bg-white pb-5"
                    body-classes="px-lg-5 py-lg-5"
                    class="border-0">                  
                  <template>
                      <div class="text-center text-muted mb-4">
                          <big>Add new sales data</big>
                      </div>
                      <form role="form">
                        <div class="container ct-example-row">
                          <div class="row">
                            <div class="col-sm">
                              <base-dropdown class="mb-3"> 
                                <base-button block slot="title" type="warning" class="dropdown-toggle">
                                  {{selectedName}}
                                </base-button>                                   
                                <ul>
                                  <li v-for="(item, index) in products" :key="item.id">
                                     <a class="dropdown-item" href="#" @click="setSelectedProduct(index)" >{{item.name}}</a>
                                  </li>
                                </ul>                           
                              </base-dropdown>
                            </div>
                            <div class="col-sm">
                              <base-input alternative
                                      class="mb-3"
                                      type="number"
                                      placeholder="Quantity"
                                      v-model="quantity">
                              </base-input>  
                            </div>                            
                          </div>
                        </div>                                                                                                  
                          <div class="text-center">
                              <base-button block type="success" class="my-4" @click="saveSalesData">Save</base-button>
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
                  :data="sales">
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
            <base-button type="danger" size="sm" icon="ni ni-fat-remove" @click="deleteSalesData(row.id)"></base-button>
            <base-button type="info" size="sm" icon="ni ni-settings-gear-65"></base-button>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total="this.salesCountNoLimit" v-model="pagination.default"></base-pagination>
    </div>

  </div>
</template>
<script>
/* eslint-disable */    
  import Product from '@/services/Product'
  import Sales from '@/services/Sales'
  import { mapGetters, mapActions } from 'vuex'
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
        rowCount: 0,
        showInputForm: false,
        selectedName: 'Product',
        selectedId: 0,
        quantity: 0,
        pagination: {
          default: 1
        }        
      }
    },
    created() {
      this.$store.dispatch("fetchSales", {        
        rowStart: 0,
        rowCount: 10
      })
      this.$store.dispatch("fetchProduct")      
    },
    computed: {
      ...mapGetters({
        sales: 'getSales',
        salesCount: 'getSalesCount',
        salesCountNoLimit: 'getSalesCountNoLimit',
        products : 'getProduct',
        user: 'getUser'
      })
    },
    methods: {            
      setSelectedProduct(index) {
        let product = this.products[index]
        this.selectedName = product.name
        this.selectedId = product.id
      },
      async saveSalesData(){        
        try {                
          const response = await Sales.add({
            user_id: this.user.user_id,
            product_id: this.selectedId,
            quantity: this.quantity
          })          
          this.$notify({
            type: 'success',
            title: response.data.message
          })
          this.$store.dispatch('fetchSales')          
        } catch (err) {          
          this.$notify({
            type: 'danger',
            title: err.response.data.message
          })
        }
      },
      async deleteSalesData(salesId){
        try {                
          const response = await Sales.delete(salesId)          
          this.$notify({
            type: 'warning',
            title: response.data.message
          })
          this.$store.dispatch('fetchSales')          
        } catch (err) {          
          this.$notify({
            type: 'danger',
            title: err.response.data.message
          })
        }
      }
    }
  }
</script>
<style>
ul {
  list-style: none;
  padding-left: 0;
}
</style>
