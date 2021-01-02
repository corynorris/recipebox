(this["webpackJsonprecipe-box"]=this["webpackJsonprecipe-box"]||[]).push([[0],{44:function(e){e.exports=JSON.parse('{"units":["pound|s","gram|s","cup|s","bunch|es","piece|s"],"ingredients":["cream cheese","sugar","quality sausage meat","fresh parsley","wonton wrappers","ground pork"],"recipes":[{"id":0,"name":"Cheese Cake","image":"/img/cheesecake.jpg","rating":2.5,"ingredients":[0,1],"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cum distinctio temporibus quia eaque quas modi aperiam cumque doloremque, iusto error, neque dignissimos nobis? Aspernatur ratione quos rerum cumque qui!"},{"id":1,"name":"Scotch Egg","image":"/img/scotch-egg.jpg","rating":4.5,"ingredients":[2,3],"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cum distinctio temporibus quia eaque quas modi aperiam cumque doloremque, iusto error, neque dignissimos nobis? Aspernatur ratione quos rerum cumque qui!"},{"id":2,"name":"Pork Dumpling","image":"/img/pork-dumpling.jpg","rating":5,"ingredients":[4,5],"description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cum distinctio temporibus quia eaque quas modi aperiam cumque doloremque, iusto error, neque dignissimos nobis? Aspernatur ratione quos rerum cumque qui!"}]}')},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),r=a(5),s=a(28),c=a(3),l=a(4),o=a(7),u=a(6),d=a(29),p=a.n(d),m={card:{position:"relative",display:"inline-block",boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",transition:"0.3s",maxHeight:"400px",overflow:"hidden"},img:{width:"100%"},details:{padding:"1rem"},header:{position:"relative"},title:{position:"absolute",bottom:"0",margin:"0 0 0.6rem 0",padding:"0.6rem",background:"rgba(255,255,255, 0.8)"}},h=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return n.a.createElement("article",{style:m.card},n.a.createElement("header",{style:m.header},n.a.createElement("img",{src:"/recipebox"+this.props.image,style:m.img,alt:this.props.title}),n.a.createElement("h3",{style:m.title},this.props.title)),n.a.createElement("section",{style:m.details},this.props.children))}}]),a}(n.a.Component),g=a(31),v=a(22),f=window.localStorage,b=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(Object(c.a)(this,e),this.storageKey=t,"undefined"===typeof Storage)throw new Error("Storage not supported");this.storageKey=t,this.isEmpty()&&null!==a&&(console.log("setting defaults"),this.set(a))}return Object(l.a)(e,[{key:"isEmpty",value:function(){return null===this.get()}},{key:"setItem",value:function(e){f.setItem(this.storageKey,JSON.stringify(Object(v.a)(Object(v.a)({},this.get()),e)))}},{key:"set",value:function(e){f.setItem(this.storageKey,JSON.stringify(e))}},{key:"get",value:function(){var e=f.getItem(this.storageKey);return JSON.parse(e)}}]),e}(),y=a(44),E=function(){function e(){Object(c.a)(this,e),this.store=new b("recipebox",y),this.data=this.store.get()||{},this.data.ingredients=this.data.ingredients||[],this.data.recipes=this.data.recipes||[]}return Object(l.a)(e,[{key:"save",value:function(){this.store.set(this.data)}},{key:"getRecipes",value:function(){return this.data=this.store.get()||{},this.data.recipes||[]}},{key:"getRecipe",value:function(e){for(var t=this.getRecipes(),a=0;a<t.length;a++)if(t[a].id===Number(e))return this.mapRecipe(t[a]);return null}},{key:"unMapRecipe",value:function(e){return{id:e.id,name:e.name,image:e.image,description:e.description,rating:e.rating,ingredients:this.addIngredients(e.ingredients)}}},{key:"mapRecipe",value:function(e){return{id:e.id,name:e.name,image:e.image,description:e.description,rating:e.rating,ingredients:this.getIngredientNames(e.ingredients)}}},{key:"getIndexById",value:function(e){for(var t=0;t<this.data.recipes.length;t++)if(this.data.recipes[t].id===Number(e))return t}},{key:"generateSafeId",value:function(){var e=this.data.recipes.map((function(e){return e.id}));return Math.max.apply(Math,Object(g.a)(e))+1}},{key:"delete",value:function(e){this.data.recipes.splice(e.id,1),this.save()}},{key:"updateRating",value:function(e,t){var a=this.getIndexById(e);this.data.recipes[a].rating=t,this.save()}},{key:"updateRecipe",value:function(e){var t=this.unMapRecipe(e),a=this.getIndexById(t.id);this.data.recipes[a]=t,console.log(this.data.recipes),this.save()}},{key:"addRecipe",value:function(e){e.id=this.generateSafeId(),e.ingredients=this.addIngredients(e.ingredients),this.data.recipes.push(e),this.save()}},{key:"getIngredientList",value:function(){return this.data=this.store.get()||{},this.data.ingredients||[]}},{key:"getIngredientName",value:function(e){var t=this.getIngredientList();return"string"===typeof t[e]?t[e]:null}},{key:"getIngredientNames",value:function(e){for(var t=[],a=0;a<e.length;a++)t.push(this.getIngredientName(e[a]));return t}},{key:"addIngredient",value:function(e){var t=this.getIngredientList().indexOf(e),a=this.data.ingredients.length;return t>=0?t:(this.data.ingredients.push(e),this.save(),a)}},{key:"addIngredients",value:function(e){for(var t=new Set,a=0;a<e.length;a++){var i=this.addIngredient(e[a]);t.add(i)}return Array.from(t)}}]),e}(),k=new E,O={ingredients:{textAlign:"left"},title:{padding:0,margin:0},list:{margin:0}},j=function(e){var t=k.getIngredientList();return n.a.createElement("div",{style:O.ingredients},n.a.createElement("h4",{style:O.title},"Ingredients"),n.a.createElement("ul",{style:O.list},e.ingredients.map((function(e){var a=t[e];return n.a.createElement("li",{key:e},a)}))))},N=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"stopBehaviour",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"render",value:function(){return console.log(this.props.recipe),n.a.createElement(h,{image:this.props.recipe.image,title:this.props.recipe.name},n.a.createElement("div",{className:"rating",onClick:this.stopBehaviour.bind(this)},n.a.createElement(p.a,{start:0,stop:5,step:1,fractions:2,emptySymbol:"fa fa-star-o fa-lg gold",placeholderSymbol:"fa fa-star fa-lg gold",fullSymbol:"fa fa-star fa-lg gold",initialRating:this.props.recipe.rating,onChange:this.props.updateRating})),n.a.createElement(j,{ingredients:this.props.recipe.ingredients}))}}]),a}(n.a.Component),I=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"row",value:function(e,t){return n.a.createElement("div",{key:t,className:"row"},e)}},{key:"col",value:function(e,t){var a="col-"+12/this.props.columns;return n.a.createElement("div",{key:t,className:a},e)}},{key:"render",value:function(){var e=this,t=[],a=[];return this.props.items.forEach((function(i,n){n%e.props.columns===0&&(t.push(e.row(a,n)),a=[]),a.push(e.col(i,n))})),t.push(this.row(a,this.props.items.length)),n.a.createElement("div",null,t)}}]),a}(n.a.Component),w=new E,S=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"componentWillMount",value:function(){var e=w.getRecipes();this.setState({recipes:e,search:""})}},{key:"delete",value:function(e){w.delete(e)}},{key:"updateRating",value:function(e){w.updateRating(this.id,e)}},{key:"render",value:function(){var e=this,t=this.state.recipes.filter((function(t){if(0===e.state.search.length)return!0;for(var a=w.getIngredientNames(t.ingredients),i=0;i<a.length;i++)if(a[i].indexOf(e.state.search)>=0)return!0;return!1}));console.log(t);var a=t.map((function(t,a){return n.a.createElement(r.b,{to:"/recipe/view/"+t.id},n.a.createElement(N,{key:a,recipe:t,updateRating:e.updateRating.bind(t)}))}));return n.a.createElement("div",null,n.a.createElement("div",{className:"searchBar"},n.a.createElement("span",{className:"fa fa-search"}),n.a.createElement("input",{className:"search",value:this.state.search,onChange:function(t){return e.setState({search:t.target.value})},placeholder:"Search Ingredients"})),n.a.createElement(I,{items:a,columns:3}))}}]),a}(n.a.Component),x=new E,q=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"componentWillMount",value:function(){var e=x.getRecipe(this.props.params.recipeId);this.setState({recipe:e})}},{key:"delete",value:function(){x.delete(this.state.recipe),r.e.push("/")}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-6",style:{position:"relative"}},n.a.createElement("h2",{className:"title",style:{background:"rgb(52,99,146)",color:"white",width:"100%",textAlign:"center",padding:"8px"}},this.state.recipe.name),n.a.createElement("img",{src:"/recipebox"+this.state.recipe.image,role:"presentation",style:{width:"100%",border:"2px solid rgb(52,99,146)"}})),n.a.createElement("div",{className:"col-5"},n.a.createElement("hr",null),n.a.createElement("h4",null,"Ingredients"),n.a.createElement("ul",null,this.state.recipe.ingredients.map((function(e,t){return n.a.createElement("li",{key:t},e)}))),n.a.createElement("hr",null),n.a.createElement("h4",null,"Description"),n.a.createElement("p",{className:"description"},this.state.recipe.description),n.a.createElement("hr",null),n.a.createElement("div",{className:"options",style:{float:"right"}},n.a.createElement(r.b,{className:"actions",to:"/recipe/edit/"+this.state.recipe.id,style:{display:"inline-block"}},n.a.createElement("i",{className:"fa fa-pencil fa-2x","aria-hidden":"true"})),n.a.createElement("div",{onClick:this.delete.bind(this),style:{display:"inline-block",marginLeft:"5px"}},n.a.createElement("i",{className:"fa fa-times fa-2x","aria-hidden":"true"}))))))}}]),a}(n.a.Component),R=a(17),C=a(30),B=a.n(C),A=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).state={recipe:i.props.recipe,error:""},i.handleTags=i.handleTags.bind(Object(R.a)(i)),i}return Object(l.a)(a,[{key:"validate",value:function(e){e&&e.length>0?this.setState({error:""}):this.setState({error:"All fields are required."})}},{key:"validateFields",value:function(e){var t=e.name&&e.name.length>0,a=e.description&&e.description.length>0,i=e.image&&e.image.length>0,n=e.ingredients&&e.ingredients.length>0;return t&&i&&a&&n}},{key:"validateImage",value:function(e,t){return new Promise((function(t,a){var i,n=new Image;n.onerror=n.onabort=function(){clearTimeout(i),a("Invalid image.")},n.onload=function(){clearTimeout(i),t("success")},i=setTimeout((function(){n.src="",a("Image loads too slowly.")}),5e3),n.src=e}))}},{key:"submitRecipe",value:function(e){e.preventDefault();var t=this.state.recipe;t.rating=5,this.validateFields(t)?this.validateImage(t.image,500).then(function(){this.props.handleSubmit(t)}.bind(this),function(e){this.setState({error:e})}.bind(this)):this.setState({error:"All fields are required."})}},{key:"handleImage",value:function(e){var t=this.state.recipe;t.image=e.target.value,this.setState({recipe:t})}},{key:"handleDescription",value:function(e){var t=this.state.recipe;t.description=e.target.value,this.setState({recipe:t})}},{key:"handleName",value:function(e){var t=this.state.recipe;t.name=e.target.value,this.setState({recipe:t})}},{key:"handleTags",value:function(e){var t=this.state.recipe;t.ingredients=e,this.setState({recipe:t})}},{key:"render",value:function(){return n.a.createElement("div",null,this.state.error.length>0&&n.a.createElement("p",{style:{color:"red"}},this.state.error),n.a.createElement("form",{onSubmit:this.submitRecipe.bind(this)},n.a.createElement("div",{className:"form-row"},n.a.createElement("label",{htmlFor:"name"},"Name"),n.a.createElement("input",{type:"text",id:"name",onChange:this.handleName.bind(this),value:this.state.recipe.name||""})),n.a.createElement("div",{className:"form-row"},n.a.createElement("label",{htmlFor:"image"},"Image"),n.a.createElement("input",{type:"text",id:"image",onChange:this.handleImage.bind(this),value:this.state.recipe.image||""})),n.a.createElement("div",{className:"form-row-tag"},n.a.createElement("label",{htmlFor:"ingredients"},"Ingredients"),n.a.createElement(B.a,{id:"ingredients",onChange:this.handleTags,addOnBlur:!0,value:this.state.recipe.ingredients||[]})),n.a.createElement("div",{className:"form-row"},n.a.createElement("label",{htmlFor:"description"},"Description"),n.a.createElement("input",{type:"text",id:"description",onChange:this.handleDescription.bind(this),value:this.state.recipe.description||""})),n.a.createElement("button",{type:"submit"},this.props.submitText)))}}]),a}(n.a.Component),T=new E,L=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).state={recipe:T.getRecipe(i.props.params.recipeId)},i}return Object(l.a)(a,[{key:"handleSubmit",value:function(e){T.updateRecipe(e),r.e.push("/")}},{key:"render",value:function(){return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12"},n.a.createElement("p",null,"Update your recipe"),n.a.createElement(A,{recipe:this.state.recipe,submitText:"Save Changes",handleSubmit:this.handleSubmit.bind(this)})))}}]),a}(n.a.Component),D=new E,F=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).state={recipe:{}},i}return Object(l.a)(a,[{key:"handleSubmit",value:function(e){D.addRecipe(e),r.e.push("/")}},{key:"render",value:function(){return n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12"},n.a.createElement("p",null,"Add a new recipe"),n.a.createElement(A,{submitText:"Add Recipe",recipe:this.state.recipe,handleSubmit:this.handleSubmit.bind(this)})))}}]),a}(n.a.Component),J=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"app"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"app-header"},n.a.createElement("h2",{className:"title"},"Recipe Box"),n.a.createElement(r.b,{className:"actions",to:"/recipe/create"},n.a.createElement("h2",null,n.a.createElement("i",{className:"fa fa-plus fa-lg","aria-hidden":"true"})))),n.a.createElement("div",{className:"app-body"},this.props.children)))}}]),a}(i.Component),M=function(e){Object(o.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"app"},n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"app-header"},n.a.createElement("h2",{className:"title"},"Recipe Box"),n.a.createElement("a",{className:"actions",onClick:r.e.goBack},n.a.createElement("h2",null,n.a.createElement("i",{className:"fa fa-arrow-left fa-lg","aria-hidden":"true"})))),n.a.createElement("div",{className:"app-body"},this.props.children)))}}]),a}(i.Component);a(45),a(46);Object(s.render)(n.a.createElement(r.d,{history:r.e},n.a.createElement(r.c,{path:"/",component:J},n.a.createElement(r.a,{component:S})),n.a.createElement(r.c,{path:"recipe",component:M},n.a.createElement(r.c,{path:"view/:recipeId",component:q}),n.a.createElement(r.c,{path:"create",component:F}),n.a.createElement(r.c,{path:"edit/:recipeId",component:L}))),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.0f1e2ae9.chunk.js.map