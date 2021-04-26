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
          <button type="button" @click="$router.push('login')" class="btn btn-success w-25">Login</button>
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
  <form id="new-car" method="POST" enctype="multipart/form-data" class="border p-3 row g-3">
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
        <select name="type" id="type" class="form-control">
          <option value="suv">SUV</option>
          <option value="sedan">Sedan</option>
          <option value="coupe">Coupe</option>
          <option value="sports">Sports</option>
          <option value="wagon">Station Wagon</option>
          <option value="hatchback">Hatchback</option>
          <option value="convertible">Convertible</option>
          <option value="minivan">Minivan</option>
          <option value="pickup">Pickup</option>
          <option value="crossover">Crossover</option>
          <option value="compact">Compact</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="field-group mb-2 col-md-6">
        <label for="transmission">Transmission</label>
        <select name="transmission" id="transmission" class="form-control">
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
          <option value="cvt">CVT</option>
          <option value="semi">Semi-automatic</option>
          <option value="other">Other</option>
        </select>
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
    carForm: function(){
      let self = this;
      let new_car = document.getElementById('new-car');
      let form_data = new FormData(new_car);
      fetch("/api/cars",
        {
          method: 'POST', 
          body: form_data,
          headers: { 
            'X-CSRFToken': token 
            // 'Authorization': 'Bearer ' 
          },
          credentials: 'same-origin'
        }).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
          console.log(jsonResponse);
          self.messages = jsonResponse;
          alert("New car added.")
          router.push("home")
        }).catch(function (error) {
            console.log(error);
        });
    },

    // redirect: function() {
    //   this.$router.push('/'); 
    // }
    // @click="redirect()"
  }
};

const Explore = {
  name: 'Explore',
  template: `
  <h2>Explore</h2>
  <div class="jumbotron  mx-sm-3 mb-sm-2">  
    <div class="form-inline d-flex justify-content-center">
      <div class="form-group mx-sm-3 mb-2">
        <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Make" />
        <input type="search" name="search" v-model="searchTerm" id="search" class="form-control mb-2 mr-sm-2" placeholder="Model" />
        <button class="btn btn-primary mb-2"
        @click="searchExplore">Search</button>
      </div>
    </div>
  </div>



  <div class="row">
  <div class="col-sm-4">
    <div class="card">
     <img class="card-img-top" src="" alt="Car image">
      <div class="card-body">
        <h5 class="card-title">{Name}       {price}</h5>
        <p class="card-text">{Description}</p>
        <a href="#" class="btn btn-primary">Veiw Details</a>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
     <img class="card-img-top" src="" alt="Car image">
      <div class="card-body">
        <h5 class="card-title">{Name}       {price}</h5>
        <p class="card-text">{Description}</p>
        <a href="#" class="btn btn-primary">Veiw Details</a>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
     <img class="card-img-top" src="" alt="Car image">
      <div class="card-body">
        <h5 class="card-title">{Name}       {price}</h5>
        <p class="card-text">{Description}</p>
        <a href="#" class="btn btn-primary">Veiw Details</a>
      </div>
    </div>
  </div>
</div>
  
  `,
  data() {
      return {}
  }
};


const user = {
  name: 'user',
  template: 
  `
  <div class="jumbotron">
    <div class="row">
      <div class="col-2">
        <img :src="" alt="Profile Photo" width="500" height="600">
      </div>
      <div class="col-8">
        <h2 class="display-4">{Name} </h2>
        <h4>{Username}</h4>
        <p>{Biography}</p>
        <h6>Email:     </h6>
        <h6>Location:     </h6>
        <h6>Date joined:     </h6>
        <p hidden>{{ $route.params.user_id }}</p>
      </div>
    </div>
  </div>

  <h1>Cars favorited</h1><br>

  <div class="row">
    <div class="col-sm-4">
      <div class="card">
      <img class="card-img-top" src="" alt="Car image">
        <div class="card-body">
          <h5 class="card-title">{Name}       {price}</h5>
          <p class="card-text">{Discription}</p>
          <a href="#" class="btn btn-primary">Veiw Details</a>
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="card">
      <img class="card-img-top" src="" alt="Car image">
        <div class="card-body">
          <h5 class="card-title">{Name}       {price}</h5>
          <p class="card-text">{Discription}</p>
          <a href="#" class="btn btn-primary">Veiw Details</a>
        </div>
      </div>
    </div>
    <div class="col-sm-4">
      <div class="card">
        <img class="card-img-top" src="" alt="Car image">
        <div class="card-body">
          <h5 class="card-title">{Name}       {price}</h5>
          <p class="card-text">{Discription}</p>
          <a href="#" class="btn btn-primary">Veiw Details</a>
        </div>
      </div>
    </div>
  </div> 
  `,

  // <div class="jumbotron">
  //   <div class="row">
  //     <div class="col-2">
  //       <img :src="" alt="Profile Photo" width="500" height="600">
  //     </div>
  //     <div class="col-8">
  //       <h2 class="display-4">{{name}}</h2>
  //       <h4>{{username}}</h4>
  //       <p>{{biography}}</p>
  //       <h6>Email:     {{email}}</h6>
  //       <h6>Location:     {{location}}</h6>
  //       <h6>Date joined:     {{date_joined}}</h6>
  //       <p hidden>{{ $route.params.user_id }}</p>
  //     </div>
  //   </div>
  // </div>

  // <h1>Cars favorited</h1><br>

  // <div class="row">
  //   <div class="col-sm-4">
  //     <div class="card">
  //     <img class="card-img-top" src="" alt="Car image">
  //       <div class="card-body">
  //         <h5 class="card-title">{Name}       {price}</h5>
  //         <p class="card-text">{Discription}</p>
  //         <a href="#" class="btn btn-primary">Veiw Details</a>
  //       </div>
  //     </div>
  //   </div>
  //   <div class="col-sm-4">
  //     <div class="card">
  //     <img class="card-img-top" src="" alt="Car image">
  //       <div class="card-body">
  //         <h5 class="card-title">{Name}       {price}</h5>
  //         <p class="card-text">{Discription}</p>
  //         <a href="#" class="btn btn-primary">Veiw Details</a>
  //       </div>
  //     </div>
  //   </div>
  //   <div class="col-sm-4">
  //     <div class="card">
  //       <img class="card-img-top" src="" alt="Car image">
  //       <div class="card-body">
  //         <h5 class="card-title">{Name}       {price}</h5>
  //         <p class="card-text">{Discription}</p>
  //         <a href="#" class="btn btn-primary">Veiw Details</a>
  //       </div>
  //     </div>
  //   </div>
  // </div> 
  // `,

  data: function()  {
    return {
  //     username: '',
  //     name: '',
  //     email: '',
  //     location: '',
  //     biography: '',
  //     photo: '',
  //     date_joined: ''
    }
  // },
  // created: function(){
  //   this.profile();
  // },
  // methods: {
  //   profile: function(){
  //     let self = this;
  //     fetch("/api/users/" + user_id,
  //       {
  //         method: 'GET',
  //         // headers: {'Authorization': 'Bearer '},
  //         // credentials: 'same-origin'
  //       }).then(function (response) {
  //           return response.json();
  //         }).then(function (jsonResponse) {
  //           self.username = jsonResponse.username;
  //           self.name = jsonResponse.name;
  //           self.email = jsonResponse.email;
  //           self.location = jsonResponse.location;
  //           self.biography = jsonResponse.biography;
  //           self.photo = jsonResponse.photo;
  //           self.date_joined = jsonResponse.date_joined;
  //         }).catch(function (error) {
  //             console.log(error);
  //         });
  //   }
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
  { path: "/explore", component: Explore },
  //{ path: "/user", component: user },
  { path: "/user/:user_id", component: user },
  // This is a catch all route in case none of the above matches
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');