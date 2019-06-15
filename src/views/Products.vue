<template>
  <div class="products">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Overview Page</h3>
            <p>Products</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/overview.svg" alt class="img-fluid">
          </div>
        </div>
      </div>
    </div>
    <h3>Create product</h3>
    <div class="product-test">
      <div class="form-group">
        <input type="text" placeholder="Product name" v-model="product.name" class="form-control">
      </div>
      <div class="form-group">
        <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
      </div>
      <div class="form-group">
        <button @click="saveData" class="btn btn-primary">Save data</button>
      </div>
    </div>
    <h3>List</h3>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products">
            <td>{{product.data().name}}</td>
            <td>{{product.data().price}}</td>
            <td>
              <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
              <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Edit Modal -->
    <div
      class="modal fade"
      id="edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product name"
                v-model="product.name"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product price"
                v-model="product.price"
                class="form-control"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Products",
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null
      },
      activeItem: null
    };
  },
  methods: {
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
      });
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          alert("Document successfully updated!");
          $("#edit").modal("hide");
          this.watcher();
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    editProduct(doc) {
      $("#edit").modal("show");
      this.product = doc.data();
      this.activeItem = doc.id;
    },
    deleteProduct(doc) {
      if (confirm("Are you sure?")) {
        db.collection("products")
          .doc(doc)
          .delete()
          .then(function() {
            alert("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      } else {
        return;
      }
    },
    readData() {
      db.collection("products")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            this.products.push(doc);
          });
        });
    },
    saveData() {
      db.collection("products")
        .add(this.product)
        .then(docRef => {
          alert("Add successed");
          this.readData();
        })
        .catch(function(error) {
          alert("Add failed", error);
        });
    },
    reset() {
      //Object.assign(this.$data, this.$options.data());
    }
  },
  created() {
    this.readData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
