<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <small>Sign up with credentials</small>
                    </div>
                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Name"
                                    addon-left-icon="ni ni-hat-3"
                                    v-model="model.name">
                        </base-input>

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
                            <base-button type="primary" class="my-4" @click="register()">Create account</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">                
                <div class="col-12 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import User from '@/services/User'  
  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          email: '',
          password: '',
          error: null
        }
      }
    },
    methods: {
      async register() {
        try {                
          const response = await User.register({
            email: this.model.email,
            name: this.model.name,
            password: this.model.password
          })
          this.model.error = null
          this.$store.dispatch('setUser', response.data)
          this.$router.push({name: 'tables'})       
          location.reload();   
        } catch (err) {          
          this.model.error = err.response.data.error
        }
      }
    }
  }
</script>
<style>
</style>
