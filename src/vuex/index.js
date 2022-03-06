import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions:{
		getService({dispatch},{urlParameter}){
	  		return new Promise(async (resolve, reject) => {
	  			try
	  			{
	  				const result = await axios.get(`http://sandbox.arabamd.com/api/v1${urlParameter}`, {'headers': { 'Content-Type':'application/json'}})
	  				.then(response => {
					    return response;
					})
					.catch(error => {
						console.log(error);
						return false;
					});
	  				resolve(result);
	  			}
	  			catch(err){
	  				reject(err);
	  			}
	  		});
	  	},
	}
})