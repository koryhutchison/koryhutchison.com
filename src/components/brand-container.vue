<template>
    <div class="brand">
        <slot></slot>
        <svg class="slant" :style="svgStyle" width="100%" preserveAspectRatio="none" viewBox="0 0 100 50">
            <polygon x="0" y="0" fill="white" :points="svgPoints"></polygon>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        slantTop: Boolean
    },
    data () {
        return {
            svgPoints: '0,50 100,50 100,48 0,20',
            svgStyle: {
                left: '0px',
                bottom: '-4px'
            }
        }
    },
    mounted () {
        if (this.slantTop) {
            this.svgPoints = '0,30 100,2 100,0 0,0';
            this.svgStyle = {
                left: '0px',
                top: '0px'
            }
        }
    }
}
</script>

<style scoped>
.brand {
    position: relative;
    height: 350px;
    background-color: #045de9;
    background-image: linear-gradient(315deg, #045de9 0%, #09c6f9 74%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
}

.slant {
    position: absolute;
    z-index: 1;
    height: 160px;
}
</style>
