

define(["jquery"], ($) => {
	class main{
		constructor(){
			this.init();
			
		}
		init(){
			//加载header.html
			// $.get("/html/component/header.html",(data)=>{
            //     $("header").html(data);
			// })
			
			$("main").load("/html/component/main.html", () => {
				
			})
		
		}
    }
	return new main();
})