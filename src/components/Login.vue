<template>
    <div class="login">
        <form action="">
            <div class="field">
                <input class="input" type="text" name="username" placeholder="Username">
                <button class="button">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
        
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.login{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
}
form{
    text-align: center;
}
form h3{
    color:#FFF;
}
input{
    text-align: center;
    font-size: 3em;
    background: transparent;
    color:#FFF;
    border: none;
    outline: none;
    box-shadow: none;
}
input::placeholder{
    color:#FFF;
    opacity: 0.5;
}
input:focus{
    color:#FFF;
    border:none;
    outline: none;
    box-shadow: none;
}
button{
    margin-top: 10px;
}
</style>
