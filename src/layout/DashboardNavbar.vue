<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>

        <ul class="navbar-nav align-items-center mr-3 d-none d-md-flex ml-lg-auto">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/sales.png">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{user.name}}</span>
                        </div>
                    </div>

                    <template>                        
                        <router-link to="#" class="dropdown-item" v-on:click.native="logout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import User from '@/services/User'
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      async logout() {
        try {                
          await User.logout()          
          this.$store.dispatch('setUser', null)
          this.$store.dispatch('setIsUserLoggedIn', false)
          this.$router.push({name: 'login'})
          location.reload()
        } catch (err) {          
          console.log(err)
        }
      }
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    }
  };
</script>
