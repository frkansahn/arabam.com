import Router from 'vue-router'
import List from '@/view/List'
import Detail from '@/view/Detail'

export default new Router({
	mode:'history',
	routes:[
		{
			path:'/',
			name: 'index',
			component: List
		},
		{
			path:'/list',
			name: 'list',
			component: List
		},
		{
			path:'/detail',
			name: 'detail',
			component: Detail
		}
	]
})