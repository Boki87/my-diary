<template>
    <div>
        Page

        {{ pageData }}
    </div>
</template>
<script>
export default {
    name:"page",
    props:['id'],
    computed: {
        pageData() {
            if(this.id !== 'new') {
                return this.id
            }else{
                return 'new page'
            }
        }
    }
}
</script>

