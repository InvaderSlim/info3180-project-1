const app = Vue.createApp({
  data() {
      return {

      }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark nav-color fixed-top">
    <i class="fas fa-car-alt text-white mr-3"></i>
    <a class="navbar-brand" href="#">United Auto Sales</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/register">Register<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/login">Login<span class="sr-only">(current)</span></router-link>
        </li>
      </ul>
    </div>
  </nav>
  `
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
  <footer>
      <div class="container">
          <p>Copyright &copy; {{ year }} Flask Inc.</p>
      </div>
  </footer>
  `,
  data() {
      return {
          year: (new Date).getFullYear()
      }
  }
});

const Home = {
  name: 'Home',
  template: `
  <div class="home">
    <div class="row">
      <div class="col justify-content-center align-self-center">
        <div class="">
          <h1 class="font-weight-bold">Buy and Sell Cars Online</h1>
          <p>United Auto Sales provides the fastest easiest and most user friendly way to buy or sell cars online. Find a Great Price on the Vehicle You Want</p>
          <button type="button" @click="$router.push('register')" class="btn btn-primary w-25 mr-3">Register</button>
          <button type="submit" class="btn btn-success w-25">Login</button>
        </div>
      </div>
      <div class="col">
        <img :src="img" class="img-fluid"/>
      </div>
    </div>
  </div>
  `,
  data() {
      return {
        img: "static/images/adam-stefanca-hdMSxGizchk-unsplash.jpg"
      }
  }
};

const NewUser = {   
  name: 'NewUser',
  template: `
  <div class="">
    <h1 class="my-4">Register New User</h1>
    <form id="new-user" @submit.prevent="regForm" method="POST" enctype="multipart/form-data" class="border rounded p-3 row g-3">
        <div class="field-group col-md-6 mb-2">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" class="form-control"/>
        </div>
        <div class="field-group col-md-6 mb-2">
            <label for="password">Password</label>
            <input type="text" name="password" id="password" class="form-control"/>
        </div>
        <div class="field-group col-md-6 mb-2">
            <label for="name">Fullname</label>
            <input type="text" name="name" id="name" class="form-control"/>
        </div>
        <div class="field-group col-md-6 mb-2">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" class="form-control"/>
        </div>
        <div class="field-group col-md-6 mb-2">
            <label for="location">Location</label>
            <input type="text" name="location" id="location" class="form-control"/>
        </div>
        <div class="field-group col-md-12 mb-2">
            <label for="bio">Biography</label>
            <textarea name="bio" id="bio" class="form-control"></textarea>
        </div>
        <div class="field-group col-md-12 mb-2">
              <label for="photo">Upload Photo</label>
              <input type="file" name="photo" id="photo" class="form-control-file"/>
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-success mt-2">Register</button>
        </div>
    </form>
  </div>
  `,
  data() {
      return {
      }
  },
  methods: {
    regForm: function(){
      let self = this;
      let new_user = document.getElementById('new-user');
      let form_data = new FormData(new_user);
      fetch("/api/register",
        {
          method: 'POST', body: form_data,
          headers: { 'X-CSRFToken': token },
          credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
          }).then(function (jsonResponse) {
            console.log(jsonResponse);
            self.messages = jsonResponse;
            alert("User Registered!")
            router.push("login")
          }).catch(function (error) {
              console.log(error);
            });
    }
  }
};

const Login = {
  name: 'Login',
  template: `
  <h1 class="my-4 text-center">Login to your account</h1>
  <form id="login" method="POST" class="border p-3">
      <div class="field-group mb-2">
          <label for="make">Username</label>
          <input type="text" name="username" id="username" class="form-control"/>
      </div>
      <div class="field-group mb-2">
          <label for="model">Password</label>
          <input type="text" name="password" id="password" class="form-control"/>
      </div>
      <button type="submit" class="btn btn-success mt-2">Login</button>
  </form>
  `
}

const NewCar = {   
  name: 'NewCar',
  template: `
  <h1>Add New Car</h1>
  <form id="new-user" method="POST" enctype="multipart/form-data" class="border p-3 row g-3">
      <div class="field-group mb-2 col-md-6">
          <label for="make">Make</label>
          <input type="text" name="make" id="make" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
          <label for="model">Model</label>
          <input type="text" name="model" id="model" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
          <label for="colour">Colour</label>
          <input type="text" name="colour" id="colour" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
          <label for="year">Year</label>
          <input type="text" name="year" id="year" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
          <label for="price">Price</label>
          <input type="text" name="price" id="price" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
          <label for="type">Car Type</label>
          <input name="type" id="type" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-6">
            <label for="transmission">Transmission</label>
            <input type="text" name="transmission" id="transmission" class="form-control"/>
      </div>
      <div class="field-group mb-2 col-md-12">
        <label for="type">Description</label>
        <textarea name="desc" id="desc" class="form-control"></textarea>
      </div>
      <div class="field-group mb-2 col-md-12">
        <label for="photo">Upload Photo</label>
        <input type="file" name="photo" id="photo" class="form-control-file"/>
      </div>
      <div class="col-md-12">
        <button type="submit" class="btn btn-success mt-2">Save</button>
      </div>
  </form>
  `,
  data() {
      return {
      }
  },
  methods: {

  }
};

const NotFound = {
  name: 'NotFound',
  template: `
  <div>
      <h1>404 - Not Found</h1>
  </div>
  `,
  data() {
      return {}
  }
};

// Define Routes
const routes = [
  { path: "/", component: Home },
  // Put other routes here
  { path: "/register", component: NewUser },
  { path: "/login", component: Login },
  { path: "/cars/new", component: NewCar },
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');