<template>
  <div class="checkout">
    <Navbar></Navbar>
    <div class="container mt-5 pt-5">
      <div class="row">
          <div class="col-md-9">
              <h4 class="py-4">Checkout</h4>
            <ul>
              <li v-for="item in this.$store.state.cart" class="media" style="padding-bottom: 20px;">
                      <img :src="item.productImage" width="80px" class="align-self-center mr-3">
                      <div class="media-body">
                        <h5 class="mt-0">{{item.productName}}
                          <span class="float-right" style="cursor: pointer" @click="$store.commit('removeFromCart', item)">X</span>
                        </h5>
                        <p class="mt-0">{{item.productPrice | currency}}</p>
                        <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                      </div>
                    </li>
            </ul>
          </div>
          <div class="col-md-3">
              <b>Total Price: {{ this.$store.getters.totalPrice | currency }}</b> 
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "checkout",
  components: {
    
  }
};
</script>
