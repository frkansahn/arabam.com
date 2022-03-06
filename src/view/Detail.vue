<template>
	<div id="detail">
		<Header/>
		<Detail/>
	</div>
</template>
<script>
	import Header from '@/components/header'
	import Detail from '@/components/detail'
	export default{
		name:'DetailPage',
		components:{ Header , Detail}
	}
</script>