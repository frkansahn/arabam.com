<template>
	<div id="listPage" v-if="products">
		<Header/>
		<div class="container mx-auto mt-5 px-2 md:px-0">
            <div class="flex justify-between">
                <select v-model="selectedSort" @change="changeSort" class="form-select appearance-none bloc px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                    <option value="0" selected>Varsayılan Sıralama</option>
                    <option value="0_0">Fiyat Artan</option>
                    <option value="0_1">Fiyat Azalan</option>
                    <option value="1_0">En Yeni</option>
                    <option value="1_1">En Eski</option>
                    <option value="2_0">Yıl Artan</option>
                    <option value="2_1">Yıl Azalan</option>
                </select>
                <div class="flex items-center">
                	<span class="pr-2">
                		Görünüm :
                	</span>
                	<select v-model="take" @change="changeTake" class="form-select appearance-none bloc px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none md:px-5">
	                    <option value="20">20</option>
	                    <option value="50">50</option>
	                </select>
                </div>                
            </div>
        </div>
        <div class="container mx-auto mt-5" v-if="products">
        	<div class="grid grid-cols-12 gap-4">
        		<div class="col-span-12 md:col-span-2 px-2 md:px-0">
        			<Filtering @insertParam="insertParam"/>
    			</div>
    			<div class="col-span-12 md:col-span-10">
    				<Listing :products="products"/>
    			</div>	
        	</div>        	
        </div>
	</div>
</template>
<script>
	import Header from '@/components/header'
	import Listing from '@/components/listing'
	import Filtering from '@/components/filtering'
	export default{
		name:'ListPage',
		components:{ Header , Listing , Filtering},
		data(){
			return{
				products:undefined,
				selectedSort:0,
				take:20
			}
		},
		methods:{
			getAllUrlParams(url) {
			  	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
			  	var obj = {};
			  	if (queryString) {
			    	queryString = queryString.split('#')[0];
			    	var arr = queryString.split('&');
			    	for (var i = 0; i < arr.length; i++) {
			      		var a = arr[i].split('=');
			      		var paramName = a[0];
			      		var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
			      		
			      		if (paramName.match(/\[(\d+)?\]$/)) {
			        		var key = paramName.replace(/\[(\d+)?\]/, '');
			        		if (!obj[key]) obj[key] = [];

			        		if (paramName.match(/\[\d+\]$/)) {
			          			var index = /\[(\d+)\]/.exec(paramName)[1];
			          			obj[key][index] = paramValue;
			        		} 
			        		else {
			          			obj[key].push(paramValue);
			        		}
			      		} 
			      		else {
					        if (!obj[paramName]) {
					          obj[paramName] = paramValue;
					        } 
					        else if (obj[paramName] && typeof obj[paramName] === 'string'){
					          obj[paramName] = [obj[paramName]];
					          obj[paramName].push(paramValue);
					        } 
					        else {
					          obj[paramName].push(paramValue);
					        }
			      		}
			    	}
			  	}
			  return obj;
			},
            insertParam(params){
            	var _this = this;
            	var query = Object.entries(_this.getAllUrlParams(window.location.href));
            	params.map(item => {
            		if(item.value)
            		{
            			var added = false;
	            		query.map(item2 => {            			
	            			if(item2[0] == item.key)
	            			{
	            				item2[1] = item.value;
	            				added = true;
	            			}
	            		})
	            		!added ? query.push({0:encodeURIComponent(item.key), 1:encodeURIComponent(item.value)}) : '';
            		}            		
            	});
            	var joined = query.map(item => {
            		return item[0] + "=" + item[1];
            	});

            	if(joined.length > 0)
            		window.location.href = window.location.origin + "?" + joined.join("&");
            	else
            		window.location.href = window.location.origin;
            },
            removeParam(removeParams) {
			  const deleteRegex = new RegExp(removeParams.join('=|') + '=');
			  const params = location.search.slice(1).split('&')
			  let search = []
			  for (let i = 0; i < params.length; i++) if (deleteRegex.test(params[i]) === false) search.push(params[i])

			  window.history.replaceState({}, document.title, location.pathname + (search.length ? '?' + search.join('&') : '') + location.hash)
			},
			getProductList(){
				try
				{
					var _this = this;
		            var fullPath = _this.$route.fullPath.replaceAll("/","");
		            fullPath == "" ? fullPath = "?" : '';
		            _this.$route.query.take == undefined ? fullPath = fullPath + '&take=' + _this.take : '';
		            _this.$store.dispatch('getService' , {"urlParameter":"/listing"+fullPath})
		            .then(response => {
		            	if(response)
		               		_this.products = response.data;
		            })
		            .catch(err => {
		            	console.log(err);
		            });
				}
				catch(err){
					console.log(err);
				}	            
	        },
	        changeSort(){
                var _this = this;
                if(_this.selectedSort == 0)
                {
                	_this.removeParam(["sort","sortDirection"])
                	_this.insertParam([]);
                }
                else
                {
                	var sort,sortDirection,params;
	                sort = String(_this.selectedSort).split("_")[0];
	                sortDirection = String(_this.selectedSort).split("_")[1];
	                var params = new Array();
	                params.push({"key":"sort","value":sort});
	                params.push({"key":"sortDirection","value":sortDirection});
	                _this.insertParam(params);
                }
                
            },
            changeTake(){
            	var _this = this;
                var params = new Array();
                params.push({"key":"take","value":_this.take});
                _this.insertParam(params);
            }
		},
		created(){
			this.getProductList();

			if(this.$route.query.take)
				this.take = this.$route.query.take;

			if(this.$route.query.sort && this.$route.query.sortDirection)
				this.selectedSort = this.$route.query.sort + "_" + this.$route.query.sortDirection
		}
	}
</script>