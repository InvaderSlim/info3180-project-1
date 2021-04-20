const app = Vue.createApp({
  data() {
      return {

      }
  }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
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
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Buy and Sell Cars Online</h1>
        <p>United Auto Sales provides the fastest easiest and most user friendly way to buy or sell cars online. Find a Great Price on the Vehicle You Want</p>
        <button type="submit" class="btn btn-primary">Register</button>
        <button type="submit" class="btn btn-success">Login</button>
      </div>
      <div class="col">
        <img :src="'/images/adam-stefanca-hdMSxGizchk-unsplash.jpg'"/>
      </div>
  </div>
  `,
  data() {
      return {}
  }
};

const NewUser = {   
  name: 'NewUser',
  template: `
  <h1>Register New User</h1>
  <form id="new-user" method="POST" enctype="multipart/form-data" class="border p-3 row g-3">
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
  `,
  data() {
      return {
      }
  },
  methods: {

  }
};

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