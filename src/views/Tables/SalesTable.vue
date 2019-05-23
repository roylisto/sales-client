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
                                      placeholder="Quantity">
                              </base-input>  
                            </div>                            
                          </div>
                        </div>                                                                                                  
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
            <base-button type="danger" size="sm" icon="ni ni-fat-remove"></base-button>
            <base-button type="info" size="sm" icon="ni ni-settings-gear-65"></base-button>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total="this.salesCount"></base-pagination>
    </div>

  </div>
</template>
<script>
/* eslint-disable */    
  import Product from '@/services/Product'
  import { mapGetters } from 'vuex'
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
        selectedId: 0        
      }
    },    
    /*created: async function () {
      const response = await Sales.list()  
      this.tableData = response.data.rows   
      this.rowCount = response.data.count  
      
      const prodResponse = await Product.list()      
      this.products = prodResponse.data.products.rows
    },*/
    created() {
      this.$store.dispatch("fetchSales")
      this.$store.dispatch("fetchProduct")      
    },
    computed: {
      ...mapGetters({
        sales: 'getSales',
        salesCount: 'getSalesCount',
        products : 'getProduct'
      })
    },
    methods: {      
      setSelectedProduct(index) {
        let product = this.products[index]
        this.selectedName = product.name
        this.selectedId = product.id
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
