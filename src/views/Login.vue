<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">                    
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Sign in with credentials</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"                                        
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <div class="text-center" v-html="model.error" v-if="model.error"/>
                            
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="login">Sign in</base-button>
                            </div>                            
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    
                    <div class="col-12 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
/* eslint-disable */
  import User from '@/services/User'
  import { mapGetters } from 'vuex'
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: '',
          error: null          
        }
      }
    },
    methods: {
      async login() {
        try {                
          const response = await User.login({
            email: this.model.email,
            password: this.model.password
          })
          this.model.error = null
          this.$store.dispatch('setUser', response.data)
          this.$router.push({name: 'dashboard'})       
          location.reload();   
        } catch (err) {          
          this.model.error = err.response.data.error
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    }
  }
</script>
<style>
</style>
